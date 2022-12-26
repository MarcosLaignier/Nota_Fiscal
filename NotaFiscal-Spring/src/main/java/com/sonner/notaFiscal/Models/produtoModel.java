package com.sonner.notaFiscal.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "produtos")
public class produtoModel {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true,nullable = false)
    private String codigoProduto;
    @Column(nullable = false)
    private String descricaoProduto;
    private Double valorUnit;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCodigoProduto() {
        return codigoProduto;
    }

    public void setCodigoProduto(String codigoProduto) {
        this.codigoProduto = codigoProduto;
    }

    public String getDescricaoProduto() {
        return descricaoProduto;
    }

    public void setDescricaoProduto(String descricaoProduto) {
        this.descricaoProduto = descricaoProduto;
    }

    public Double getValorUnit() {
        return valorUnit;
    }

    public void setValorUnit(Double valorUnit) {
        this.valorUnit = valorUnit;
    }

    @Override
    public String toString() {
        return "produtoModel{" +
                "id=" + id +
                ", codigoProduto='" + codigoProduto + '\'' +
                ", descricaoProduto='" + descricaoProduto + '\'' +
                ", valorUnit=" + valorUnit +
                '}';
    }
}
