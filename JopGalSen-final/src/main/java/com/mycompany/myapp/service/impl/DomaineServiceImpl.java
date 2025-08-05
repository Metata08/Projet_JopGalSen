package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Domaine;
import com.mycompany.myapp.repository.DomaineRepository;
import com.mycompany.myapp.service.DomaineService;
import com.mycompany.myapp.service.dto.DomaineDTO;
import com.mycompany.myapp.service.mapper.DomaineMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Domaine}.
 */
@Service
@Transactional
public class DomaineServiceImpl implements DomaineService {

    private static final Logger LOG = LoggerFactory.getLogger(DomaineServiceImpl.class);

    private final DomaineRepository domaineRepository;

    private final DomaineMapper domaineMapper;

    public DomaineServiceImpl(DomaineRepository domaineRepository, DomaineMapper domaineMapper) {
        this.domaineRepository = domaineRepository;
        this.domaineMapper = domaineMapper;
    }

    @Override
    public DomaineDTO save(DomaineDTO domaineDTO) {
        LOG.debug("Request to save Domaine : {}", domaineDTO);
        Domaine domaine = domaineMapper.toEntity(domaineDTO);
        domaine = domaineRepository.save(domaine);
        return domaineMapper.toDto(domaine);
    }

    @Override
    public DomaineDTO update(DomaineDTO domaineDTO) {
        LOG.debug("Request to update Domaine : {}", domaineDTO);
        Domaine domaine = domaineMapper.toEntity(domaineDTO);
        domaine = domaineRepository.save(domaine);
        return domaineMapper.toDto(domaine);
    }

    @Override
    public Optional<DomaineDTO> partialUpdate(DomaineDTO domaineDTO) {
        LOG.debug("Request to partially update Domaine : {}", domaineDTO);

        return domaineRepository
            .findById(domaineDTO.getId())
            .map(existingDomaine -> {
                domaineMapper.partialUpdate(existingDomaine, domaineDTO);

                return existingDomaine;
            })
            .map(domaineRepository::save)
            .map(domaineMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DomaineDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Domaines");
        return domaineRepository.findAll(pageable).map(domaineMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DomaineDTO> findOne(Long id) {
        LOG.debug("Request to get Domaine : {}", id);
        return domaineRepository.findById(id).map(domaineMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Domaine : {}", id);
        domaineRepository.deleteById(id);
    }
}
