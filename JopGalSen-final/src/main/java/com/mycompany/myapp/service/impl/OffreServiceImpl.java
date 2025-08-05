package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Offre;
import com.mycompany.myapp.repository.OffreRepository;
import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.OffreService;
import com.mycompany.myapp.service.dto.OffreDTO;
import com.mycompany.myapp.service.mapper.OffreMapper;

import java.nio.file.AccessDeniedException;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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


           // --- DÉBUT DE LA LOGIQUE DE SÉCURITÉ PERSONNALISÉE ---
        
        // On récupère l'offre existante avec toutes ses relations pour la vérification
        Optional<Offre> existingOffreOptional = offreRepository.findById(offreDTO.getId());
        
        if (!existingOffreOptional.isPresent()) {
            // Normalement géré par le contrôleur, mais c'est une sécurité supplémentaire
            throw new RuntimeException(new AccessDeniedException("L'offre à modifier n'existe pas."));
        }
        
        Offre existingOffre = existingOffreOptional.get();

        // On vérifie si l'utilisateur courant est un admin. Si oui, il a tous les droits.
        boolean isAdmin = SecurityUtils.hasCurrentUserThisAuthority(AuthoritiesConstants.ADMIN);

        // Sinon (si ce n'est pas un admin), on vérifie s'il est le propriétaire de l'offre.
        if (!isAdmin) {
            String currentUserLogin = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new RuntimeException(new AccessDeniedException("Accès refusé : utilisateur non identifié.")));
            
            // On vérifie que l'offre a bien un recruteur et un utilisateur associés.
            if (existingOffre.getRecruteur() == null || existingOffre.getRecruteur().getUser() == null) {
                // Cette erreur indique un problème de données, mais c'est une sécurité importante.
                throw new RuntimeException(new AccessDeniedException("Accès refusé : l'offre n'a pas de propriétaire défini."));
            }

            String ownerLogin = existingOffre.getRecruteur().getUser().getLogin();

            if (!currentUserLogin.equals(ownerLogin)) {
                // Si les logins ne correspondent pas, on lève une exception.
                // Spring Security la transformera en une réponse HTTP 403 Forbidden.
                throw new RuntimeException(new AccessDeniedException("Accès refusé : vous n'êtes pas le propriétaire de cette offre."));
            }
        }
        //


        return offreRepository
            .findById(offreDTO.getId())
            .map(offreEntity -> {
                offreMapper.partialUpdate(offreEntity, offreDTO);

                return offreEntity;
            })
            .map(offreRepository::save)
            .map(offreMapper::toDto);
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
}
