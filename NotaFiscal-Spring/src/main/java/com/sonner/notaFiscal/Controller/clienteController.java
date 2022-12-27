package com.sonner.notaFiscal.Controller;


import com.sonner.notaFiscal.Models.produtoModel;
import com.sonner.notaFiscal.Repository.clienteRepository;
import com.sonner.notaFiscal.Models.clienteModel;
import com.sonner.notaFiscal.Repository.clienteRepositoryCustom;
import com.sonner.notaFiscal.Services.clienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/servlet/clientes")

public class clienteController {

    final com.sonner.notaFiscal.Repository.clienteRepository clienteRepository;
    final com.sonner.notaFiscal.Repository.clienteRepositoryCustom clienteRepositoryCustom;

    public clienteController(clienteRepository clienteRepository, com.sonner.notaFiscal.Services.clienteService clienteService, clienteRepositoryCustom clienteRepositoryCustom) {
        this.clienteRepository = clienteRepository;
        this.clienteService = clienteService;
        this.clienteRepositoryCustom = clienteRepositoryCustom;
    }

    final clienteService clienteService;


    @GetMapping("/list")
    public List<clienteModel> listCliente() {
        return clienteRepository.findAll();
    }

    @GetMapping("/list/{idCliente}")
    public Optional<clienteModel> listClienteId(@PathVariable int idCliente){
        try {
            return clienteRepository.findById(idCliente);
        }catch (EmptyResultDataAccessException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,String.format("Entidade nao encontrada"));
        }
        }

    @PostMapping("/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public clienteModel insertCliente(@RequestBody clienteModel cliente) {
        return clienteRepository.save(cliente);
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCliente(@RequestParam int idCliente) {
        this.clienteService.deleteClienteService(idCliente);
    }

    @PutMapping("/alter/{idCliente}")
    public ResponseEntity alteraCliente(@PathVariable int idCliente, @RequestBody clienteModel cliente) {
        return clienteRepository.findById(idCliente).map(
                response -> {
                    response.setNomeCliente(cliente.getNomeCliente());
                    response.setCPF(cliente.getCPF());
                    clienteRepository.save(response);

                    return ResponseEntity.ok().build();
                }
        ).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/Filter")
    public List<clienteModel> findCustom(@RequestParam(value = "nomeCliente",required = false) String nomeCliente,
                                         @RequestParam(value = "CPF",required = false) String CPF ){
        return this.clienteRepositoryCustom.find(nomeCliente,CPF);
    }

}
