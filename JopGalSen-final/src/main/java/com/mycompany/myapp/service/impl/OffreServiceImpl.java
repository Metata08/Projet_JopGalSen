package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Offre;
import com.mycompany.myapp.repository.OffreRepository;
import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.OffreService;
import com.mycompany.myapp.service.dto.OffreDTO;
import com.mycompany.myapp.service.mapper.OffreMapper;
import java.util.stream.Collectors;


import java.util.Optional;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.access.AccessDeniedException; 


/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Offre}.
 */
@Service
@Transactional
public class OffreServiceImpl implements OffreService {

    private static final Logger LOG = LoggerFactory.getLogger(OffreServiceImpl.class);

    private final OffreRepository offreRepository;

    private final OffreMapper offreMapper;

    public OffreServiceImpl(OffreRepository offreRepository, OffreMapper offreMapper) {
        this.offreRepository = offreRepository;
        this.offreMapper = offreMapper;
    }

    @Override
    public OffreDTO save(OffreDTO offreDTO) {
        LOG.debug("Request to save Offre : {}", offreDTO);
        Offre offre = offreMapper.toEntity(offreDTO);
        offre = offreRepository.save(offre);
        return offreMapper.toDto(offre);
    }

    @Override
    public OffreDTO update(OffreDTO offreDTO) {
        LOG.debug("Request to update Offre : {}", offreDTO);
        Offre offre = offreMapper.toEntity(offreDTO);
        offre = offreRepository.save(offre);
        return offreMapper.toDto(offre);
    }

    @Override
    public Optional<OffreDTO> partialUpdate(OffreDTO offreDTO) {
        LOG.debug("Request to partially update Offre : {}", offreDTO);

        // --- CORRECTION APPLIQUÉE ICI ---
        // On récupère l'entité et on lève une exception si elle n'existe pas, en une seule ligne.
        Offre existingOffre = offreRepository
            .findById(offreDTO.getId())
            .orElseThrow(() -> new AccessDeniedException("L'offre avec l'ID " + offreDTO.getId() + " n'existe pas."));

        // On effectue les vérifications de sécurité.
        boolean isAdmin = SecurityUtils.hasCurrentUserThisAuthority(AuthoritiesConstants.ADMIN);

        // Si l'utilisateur n'est PAS un admin, on doit vérifier qu'il est le propriétaire.
        if (!isAdmin) {
            String currentUserLogin = SecurityUtils
                .getCurrentUserLogin()
                .orElseThrow(() -> new AccessDeniedException("Accès refusé : utilisateur non identifié."));

            if (existingOffre.getRecruteur() == null || existingOffre.getRecruteur().getUser() == null) {
                throw new AccessDeniedException("Accès refusé : l'offre n'a pas de propriétaire défini.");
            }

            String ownerLogin = existingOffre.getRecruteur().getUser().getLogin();

            if (!currentUserLogin.equals(ownerLogin)) {
                throw new AccessDeniedException("Accès refusé : vous n'êtes pas le propriétaire de cette offre.");
            }
        }

        // Si la sécurité est validée, on procède à la mise à jour.
        offreMapper.partialUpdate(existingOffre, offreDTO);
        
        Offre updatedOffre = offreRepository.save(existingOffre);
        
        return Optional.of(offreMapper.toDto(updatedOffre));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OffreDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Offres");
        return offreRepository.findAll(pageable).map(offreMapper::toDto);
    }

    public Page<OffreDTO> findAllWithEagerRelationships(Pageable pageable) {
        return offreRepository.findAllWithEagerRelationships(pageable).map(offreMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OffreDTO> findOne(Long id) {
        LOG.debug("Request to get Offre : {}", id);
        return offreRepository.findOneWithEagerRelationships(id).map(offreMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Offre : {}", id);
        offreRepository.deleteById(id);
    }

    /**Recuperer les offres par recruteur */
    @Override
    @Transactional(readOnly = true)
    public List<OffreDTO> findByUserId(Long userId) {
        LOG.debug("Recherche des offres pour userId = {}", userId);
        List<Offre> offres = offreRepository.findByUserId(userId);
        LOG.debug("Offres trouvées = {}", offres.size());
        return offres.stream()
            .map(offreMapper::toDto)
            .collect(Collectors.toList());
    }
}
