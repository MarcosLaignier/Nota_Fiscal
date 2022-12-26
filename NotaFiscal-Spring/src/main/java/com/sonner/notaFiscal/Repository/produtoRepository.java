package com.sonner.notaFiscal.Repository;

import com.sonner.notaFiscal.Models.produtoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface produtoRepository extends JpaRepository<produtoModel,Integer> {

}
