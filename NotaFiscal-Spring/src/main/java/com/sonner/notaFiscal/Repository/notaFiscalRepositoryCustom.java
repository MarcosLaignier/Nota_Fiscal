package com.sonner.notaFiscal.Repository;

import com.sonner.notaFiscal.Models.notaFiscalModel;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class notaFiscalRepositoryCustom {
    private final EntityManager entityManager;

    public notaFiscalRepositoryCustom(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<notaFiscalModel> find(String numeroNf, String serieNf,String valorTotal, String nomeCliente){

        String query = "select Nf from notaFiscalModel AS Nf join clienteModel C on (Nf.cliente.Id = C.Id) where 1=1 ";

        Map<String,String> map = new HashMap<>();

        map.put(numeroNf,"and Nf.numeroNf like :numeroNf ");
        map.put(serieNf," and Nf.serieNf = :serieNf ");
        map.put(valorTotal,"and Nf.valorTotal= :valorTotal ");
        map.put(nomeCliente,"and C.nomeCliente like :nomeCliente ");
        for( Map.Entry<String,String> entry : map.entrySet()){
            if (entry.getKey() !=null){
                query+=entry.getValue();
            }
        }
        var q = entityManager.createQuery(query);


        if(numeroNf !=null ){
            q.setParameter("numeroNf","%"+numeroNf+"%");
        }

        if (serieNf!=null ){
            q.setParameter("serieNf",serieNf);

        }

        if(valorTotal != null){
            q.setParameter("valorTotal",valorTotal);
        }

        if(nomeCliente !=null){
            q.setParameter("nomeCliente","%"+nomeCliente+"%");
        }



        return q.getResultList();
    }
}
