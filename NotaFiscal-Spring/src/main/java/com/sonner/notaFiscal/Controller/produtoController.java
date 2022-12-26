package com.sonner.notaFiscal.Controller;

import com.sonner.notaFiscal.Models.notaFiscalModel;
import com.sonner.notaFiscal.Models.produtoModel;
import com.sonner.notaFiscal.Repository.produtoRepository;
import com.sonner.notaFiscal.Repository.produtoRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/servlet/produtos")
public class produtoController {
    final com.sonner.notaFiscal.Repository.produtoRepository produtoRepository;
    final produtoRepositoryCustom produtoRepositoryCustom;

    public produtoController(produtoRepository produtoRepository, produtoRepositoryCustom produtoRepositoryCustom) {
        this.produtoRepository = produtoRepository;
        this.produtoRepositoryCustom = produtoRepositoryCustom;
    }


    @GetMapping("/list")
    public List<produtoModel> listProdutos() {
        return this.produtoRepository.findAll();
    }

    @GetMapping("/list/{idProduto}")
    public Optional<produtoModel> listProdutoById(@PathVariable int idProduto) {
        return this.produtoRepository.findById(idProduto);
    }

    @PostMapping("/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public void insertProdutos(@RequestBody produtoModel produto) {
        try {
            this.produtoRepository.save(produto);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProdutos(@RequestParam int idProduto) {
        try {
            this.produtoRepository.deleteById(idProduto);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Entidade nao encontrada"));
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }


    @PutMapping("/alter/{idProduto}")
    public ResponseEntity alteraProduto(@PathVariable int idProduto, @RequestBody produtoModel produto) {
        return produtoRepository.findById(idProduto).map(
                response -> {
                    response.setCodigoProduto(produto.getCodigoProduto());
                    response.setDescricaoProduto(produto.getDescricaoProduto());
                    response.setValorUnit(produto.getValorUnit());
                    produtoRepository.save(response);
                    return ResponseEntity.ok().build();
                }
        ).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/Filter")
    public List<produtoModel> findCustom(@RequestParam(value = "codigoProduto",required = false) String codigoProduto,
                                            @RequestParam(value = "descricaoProduto",required = false) String descricaoProduto ,
                                            @RequestParam(value = "valorUnit",required = false) String valorUnit){
        return this.produtoRepositoryCustom.find(codigoProduto,descricaoProduto,valorUnit);
    }
}
