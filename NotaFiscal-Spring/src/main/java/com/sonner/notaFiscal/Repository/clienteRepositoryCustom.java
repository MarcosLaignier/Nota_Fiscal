package com.sonner.notaFiscal.Repository;

import com.sonner.notaFiscal.Models.clienteModel;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class clienteRepositoryCustom {
    private final EntityManager entityManager;

    public clienteRepositoryCustom(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<clienteModel> find(String nomeCliente, String CPF){

        String query = "select C from clienteModel AS C where 1=1 ";

        Map<String,String> map = new HashMap<>();

        map.put(nomeCliente,"and C.nomeCliente like :nomeCliente");
        map.put(CPF," and C.CPF = :CPF");
        for( Map.Entry<String,String> entry : map.entrySet()){
            if (entry.getKey() !=null){
                query+=entry.getValue();
            }
        }
        var q = entityManager.createQuery(query);


        if(nomeCliente !=null ){
            q.setParameter("nomeCliente","%"+nomeCliente+"%");
        }

        if (CPF!=null ){
            q.setParameter("CPF",CPF);

        }



        return q.getResultList();
    }
}
