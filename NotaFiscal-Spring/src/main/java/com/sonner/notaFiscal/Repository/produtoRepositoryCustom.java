package com.sonner.notaFiscal.Repository;

import com.sonner.notaFiscal.Models.produtoModel;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class produtoRepositoryCustom {

    private final EntityManager entityManager;

    public produtoRepositoryCustom(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<produtoModel> find(String codigoProduto, String descricaoProduto, String valorUnit){

        String query = "select P from produtoModel AS P where 1=1 ";

        Map<String,String> map = new HashMap<>();

        map.put(codigoProduto,"and P.codigoProduto like :codigoProduto");
        map.put(descricaoProduto," and P.descricaoProduto like :descricaoProduto");
        map.put(valorUnit," and P.valorUnit = :valorUnit");
        for( Map.Entry<String,String> entry : map.entrySet()){
            if (entry.getKey() !=null){
                query+=entry.getValue();
            }
        }
        var q = entityManager.createQuery(query);


        if(codigoProduto !=null ){
            q.setParameter("codigoProduto","%"+codigoProduto+"%");
        }

        if (descricaoProduto!=null ){
            q.setParameter("descricaoProduto","%"+descricaoProduto+"%");

        }

        if (valorUnit!=null ){
            q.setParameter("valorUnit",Double.parseDouble(valorUnit));
        }


        return q.getResultList();
    }
}
