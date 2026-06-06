package com.joao.Imuno_Cadastro.services.impl;

import com.joao.Imuno_Cadastro.dtos.UsuarioRequestDTO;
import com.joao.Imuno_Cadastro.dtos.UsuarioResponseDTO;
import com.joao.Imuno_Cadastro.models.Usuario;
import com.joao.Imuno_Cadastro.repositories.UsuarioRepository;
import com.joao.Imuno_Cadastro.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl
        implements UsuarioService {

    private final UsuarioRepository repository;

    @Override
    public UsuarioResponseDTO cadastrar(
            UsuarioRequestDTO dto) {

        if (repository.existsByEmail(dto.email())) {
            throw new RuntimeException(
                    "Email já cadastrado"
            );
        }

        Usuario usuario = new Usuario();

        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setSenhaHash(dto.senhaHash());
        usuario.setPerfil(dto.perfil());
        usuario.setAtivo(true);

        repository.save(usuario);

        return toResponseDTO(usuario);
    }

    @Override
    public UsuarioResponseDTO buscarPorId(Long id) {

        Usuario usuario = buscarUsuario(id);

        return toResponseDTO(usuario);
    }

    @Override
    public UsuarioResponseDTO buscarPorEmail(
            String email) {

        Usuario usuario = repository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Usuário não encontrado"
                        ));

        return toResponseDTO(usuario);
    }

    @Override
    public List<UsuarioResponseDTO>
    listarTodos() {

        return repository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Override
    public UsuarioResponseDTO atualizar(
            Long id,
            UsuarioRequestDTO dto) {

        Usuario usuario = buscarUsuario(id);

        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setPerfil(dto.perfil());

        repository.save(usuario);

        return toResponseDTO(usuario);
    }

    @Override
    public void alterarStatus(
            Long id,
            Boolean ativo) {

        Usuario usuario =
                buscarUsuario(id);

        usuario.setAtivo(ativo);

        repository.save(usuario);
    }

    private Usuario buscarUsuario(
            Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Usuário não encontrado"
                        ));
    }

    private UsuarioResponseDTO
    toResponseDTO(Usuario usuario) {

        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getPerfil(),
                usuario.getAtivo(),
                usuario.getCriadoEm(),
                usuario.getUltimoLogin()
        );
    }
}
