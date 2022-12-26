package com.sonner.notaFiscal.Repository;

import com.sonner.notaFiscal.Models.notaFiscalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface notaFiscalRepository extends JpaRepository<notaFiscalModel,Integer> {


}
