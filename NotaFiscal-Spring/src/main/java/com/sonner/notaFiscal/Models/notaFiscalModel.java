package com.sonner.notaFiscal.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sonner.notaFiscal.Models.clienteModel;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "notaFiscal")
public class notaFiscalModel {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false,unique = true)
    private String numeroNf;
    private String serieNf;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date dataEmissao;
    @OneToOne
    private clienteModel cliente;


    private double valorTotal;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNumeroNf() {
        return numeroNf;
    }

    public void setNumeroNf(String numeroNf) {
        this.numeroNf = numeroNf;
    }

    public String getSerieNf() {
        return serieNf;
    }

    public void setSerieNf(String serieNf) {
        this.serieNf = serieNf;
    }

    public Date getDataEmissao() {
        return dataEmissao;
    }


    public void setDataEmissao(Date dataEmissao) {
        this.dataEmissao = dataEmissao;
    }

    public clienteModel getCliente() {
        return cliente;
    }

    public void setCliente(clienteModel cliente) {
        this.cliente = cliente;
    }



    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }

    @Override
    public String toString() {
        return "notaFiscalModel{" +
                "id=" + id +
                ", numeroNf='" + numeroNf + '\'' +
                ", serieNf='" + serieNf + '\'' +
                ", dataEmissao=" + dataEmissao +
                ", cliente=" + cliente +
                ", valorTotal=" + valorTotal +
                '}';
    }
}
