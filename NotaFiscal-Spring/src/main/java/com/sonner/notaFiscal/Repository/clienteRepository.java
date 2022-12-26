package com.sonner.notaFiscal.Repository;

import com.sonner.notaFiscal.Models.clienteModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface clienteRepository extends JpaRepository<clienteModel, Integer> {


}
