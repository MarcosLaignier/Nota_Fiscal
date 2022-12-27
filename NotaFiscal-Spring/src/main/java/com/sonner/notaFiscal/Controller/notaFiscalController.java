package com.sonner.notaFiscal.Controller;

import com.sonner.notaFiscal.Models.notaFiscalModel;
import com.sonner.notaFiscal.Models.produtosNotaFiscal;
import com.sonner.notaFiscal.Repository.notaFiscalRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/servlet/notaFiscal")
public class notaFiscalController {

    final com.sonner.notaFiscal.Repository.notaFiscalRepository notaFiscalRepository;
    final com.sonner.notaFiscal.Repository.produtosNotaFiscalRepository produtosNotaFiscalRepository;

    final com.sonner.notaFiscal.Repository.notaFiscalRepositoryCustom notaFiscalRepositoryCustom;

    public notaFiscalController(com.sonner.notaFiscal.Repository.notaFiscalRepository notaFiscalRepository, com.sonner.notaFiscal.Repository.produtosNotaFiscalRepository produtosNotaFiscalRepository, notaFiscalRepositoryCustom notaFiscalRepositoryCustom) {
        this.notaFiscalRepository = notaFiscalRepository;
        this.produtosNotaFiscalRepository = produtosNotaFiscalRepository;
        this.notaFiscalRepositoryCustom = notaFiscalRepositoryCustom;
    }

    @GetMapping("/list")
    public List<notaFiscalModel> listNotasFiscais() {

        return notaFiscalRepository.findAll();
    }

    @GetMapping("/list/{idNota}")
    public Optional<notaFiscalModel> listNotaFiscalById(@PathVariable int idNota) {

        return notaFiscalRepository.findById(idNota);
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteNota(@RequestParam int idNota) {
        this.notaFiscalRepository.deleteById(idNota);
    }

    @GetMapping("/listProdutosNf/{idNota}")
    public List<produtosNotaFiscal> listNotasFiscais2(@PathVariable int idNota) {

        return produtosNotaFiscalRepository.findAllByNotaFiscal_Id(idNota);
    }

    @PostMapping("/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public notaFiscalModel insertNotaFiscal(@RequestBody notaFiscalModel notaFiscal) {
        return this.notaFiscalRepository.save(notaFiscal);

    }

    @PostMapping("/insertProd")
    @ResponseStatus(HttpStatus.CREATED)
    public produtosNotaFiscal insertProdutosNotaFiscal(@RequestBody produtosNotaFiscal nf) {

        return this.produtosNotaFiscalRepository.save(nf);
    }

    @PutMapping("/alter/{idNota}")
    public ResponseEntity alterNotaFiscal(@PathVariable int idNota, @RequestBody notaFiscalModel notaFiscal) {
        return this.notaFiscalRepository.findById(idNota).map(
                response -> {
                    response.setNumeroNf(notaFiscal.getNumeroNf());
                    response.setSerieNf(notaFiscal.getSerieNf());
                    response.setCliente(notaFiscal.getCliente());
                    response.setDataEmissao(notaFiscal.getDataEmissao());
                    response.setValorTotal(notaFiscal.getValorTotal());
                    notaFiscalRepository.save(response);
                    return ResponseEntity.ok().build();
                }
        ).orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/Filter")
    public List<notaFiscalModel> filterCustom(@RequestParam (value = "numeroNf" , required = false) String numeroNf,
                                              @RequestParam(value = "serieNf", required = false) String serieNf,
                                              @RequestParam(value = "valorTotal", required = false)String valorTotal,
                                              @RequestParam(value = "nomeCliente",required = false)String nomeCliente){
        return this.notaFiscalRepositoryCustom.find(numeroNf,serieNf,valorTotal,nomeCliente);

    }



}


