package com.sonner.notaFiscal.Repository;

import com.sonner.notaFiscal.Models.produtosNotaFiscal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface produtosNotaFiscalRepository extends JpaRepository<produtosNotaFiscal,Integer> {

    public List<produtosNotaFiscal> findAllByNotaFiscal_Id(Integer notaFiscal_id);

}
