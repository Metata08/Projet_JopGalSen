package com.mycompany.myapp.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.service.DashboardService;
import com.mycompany.myapp.service.dto.StatsDTO;

@RestController
@RequestMapping("/api")
public class DashboardResource {

    private final Logger log = LoggerFactory.getLogger(DashboardResource.class);

    private final DashboardService dashboardService;

    public DashboardResource(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    /**
     * {@code GET  /stats} : Récupère les statistiques de l'application pour le tableau de bord.
     *
     * @return le {@link ResponseEntity} avec le statut {@code 200 (OK)} et les statistiques dans le corps.
     */
    @GetMapping("/stats")
    //Autoriser tout le monde

    public ResponseEntity<StatsDTO> getStats() {
        log.debug("REST request to get application statistics");
        StatsDTO stats = dashboardService.getStats();
        return ResponseEntity.ok(stats);
    }
}