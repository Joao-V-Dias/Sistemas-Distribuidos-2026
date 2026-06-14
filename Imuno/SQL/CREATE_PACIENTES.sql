INSERT INTO paciente (
    nome,
    cpf,
    data_nascimento,
    sexo,
    telefone,
    observacoes,
    ativo,
    criado_em
) VALUES
(
    'Ana Clara Souza',
    '12345678901',
    '1998-03-15',
    'F',
    '34999990001',
    'Paciente sem restrições.',
    true,
    NOW()
),
(
    'Carlos Eduardo Lima',
    '12345678902',
    '1985-07-22',
    'M',
    '34999990002',
    'Alergia leve a dipirona.',
    true,
    NOW()
),
(
    'Fernanda Oliveira Santos',
    '12345678903',
    '2001-11-09',
    'F',
    '34999990003',
    'Histórico de vacinação incompleto.',
    true,
    NOW()
),
(
    'João Pedro Martins',
    '12345678904',
    '1995-01-30',
    'M',
    '34999990004',
    'Paciente hipertenso.',
    true,
    NOW()
),
(
    'Mariana Costa Ferreira',
    '12345678905',
    '2003-09-12',
    'F',
    '34999990005',
    'Sem observações.',
    true,
    NOW()
),
(
    'Lucas Henrique Alves',
    '12345678906',
    '1992-04-18',
    'M',
    '34999990006',
    'Acompanhamento anual.',
    true,
    NOW()
),
(
    'Patrícia Gomes Ribeiro',
    '12345678907',
    '1989-12-03',
    'F',
    '34999990007',
    'Diabética.',
    true,
    NOW()
),
(
    'Rafael Mendes Rocha',
    '12345678908',
    '1997-06-27',
    'M',
    '34999990008',
    'Sem alergias conhecidas.',
    true,
    NOW()
),
(
    'Juliana Almeida Castro',
    '12345678909',
    '1990-08-14',
    'F',
    '34999990009',
    'Gestante.',
    true,
    NOW()
),
(
    'Gabriel Fernandes Silva',
    '12345678910',
    '2005-02-20',
    'M',
    '34999990010',
    'Paciente recém-cadastrado.',
    true,
    NOW()
);