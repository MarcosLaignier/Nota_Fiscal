package com.sonner.notaFiscal.Models;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Data;
import org.springframework.web.bind.annotation.RequestParam;

@Entity
@Table(name = "clientes")
public class clienteModel {


    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;
    private String nomeCliente;
    @Column(unique = true,nullable = false)
    private String CPF;


    public int getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getCPF() {
        return CPF;
    }

    public void setCPF(String CPF) {
        this.CPF = CPF;
    }
}
