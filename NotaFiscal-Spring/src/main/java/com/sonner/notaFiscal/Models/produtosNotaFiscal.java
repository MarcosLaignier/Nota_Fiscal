package com.sonner.notaFiscal.Models;

import jakarta.persistence.*;

import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "produtos_NF")
public class produtosNotaFiscal {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    private produtoModel produto;
    @OneToOne
    private notaFiscalModel notaFiscal;
    private int quantidade;



    public notaFiscalModel getNotaFiscal() {
        return notaFiscal;
    }

    public void setNotaFiscal(notaFiscalModel notaFiscal) {
        this.notaFiscal = notaFiscal;
    }


    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public produtoModel getProduto() {
        return produto;
    }

    public void setProduto(produtoModel produto) {
        this.produto = produto;
    }


    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }


    @Override
    public String toString() {
        return "produtosNotaFiscal{" +
                "id=" + id +
                ", produto=" + produto +
                ", quantidade=" + quantidade +
                '}';
    }
}

