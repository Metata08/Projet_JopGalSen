package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.repository.CandidatRepository;
import com.mycompany.myapp.repository.OffreRepository;
import com.mycompany.myapp.repository.RecruteurRepository;
import com.mycompany.myapp.service.DashboardService;
import com.mycompany.myapp.service.dto.StatsDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final OffreRepository offreRepository;
    private final CandidatRepository candidatRepository;
    private final RecruteurRepository recruteurRepository;

    public DashboardServiceImpl(
        OffreRepository offreRepository,
        CandidatRepository candidatRepository,
        RecruteurRepository recruteurRepository
    ) {
        this.offreRepository = offreRepository;
        this.candidatRepository = candidatRepository;
        this.recruteurRepository = recruteurRepository;
    }

    @Override
    public StatsDTO getStats() {
        StatsDTO stats = new StatsDTO();

       
        stats.setOffresActives(offreRepository.count());

        //  profils candidats créés
        stats.setCandidatsInscrits(candidatRepository.count());

        //  nombre d'entreprises uniques basées sur les profils recruteurs
        stats.setEntreprises(recruteurRepository.countDistinctByEntreprise());

        return stats;
    }
}