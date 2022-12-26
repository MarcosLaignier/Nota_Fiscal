package com.sonner.notaFiscal.Services;

import com.sonner.notaFiscal.Repository.clienteRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class clienteService {
    final com.sonner.notaFiscal.Repository.clienteRepository clienteRepository;

    public clienteService(clienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }


    public void deleteClienteService(int id) {
        try {
            this.clienteRepository.deleteById(id);
        } catch (
                EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Entidade nao encontrada"));
        } catch (
                DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, String.format("Cliente ja em uso, Impossivel exclusão"));
        }

    }

}
