INSERT INTO freezer (
    numero_serie,
    modelo,
    localizacao,
    temp_min_segura,
    temp_max_segura,
    status,
    criado_em
) VALUES
(
    'FRZ-BUT-2026-001',
    'Thermo Scientific TSX600',
    'Sala de Vacinas - Unidade Central',
    -80.00,
    -60.00,
    'OPERACIONAL',
    NOW()
),
(
    'FRZ-BUT-2026-002',
    'Eppendorf CryoCube F740',
    'Laboratório de Armazenamento A',
    -25.00,
    -15.00,
    'OPERACIONAL',
    NOW()
),
(
    'FRZ-BUT-2026-003',
    'Panasonic MDF-U443',
    'Sala de Imunização Infantil',
    2.00,
    8.00,
    'ALERTA',
    NOW()
),
(
    'FRZ-BUT-2026-004',
    'Haier DW-86L728J',
    'Centro de Distribuição Regional',
    -86.00,
    -60.00,
    'MANUTENCAO',
    NOW()
),
(
    'FRZ-BUT-2026-005',
    'Elber CSV 280',
    'Posto de Saúde Norte',
    2.00,
    8.00,
    'OPERACIONAL',
    NOW()
),
(
    'FRZ-BUT-2026-006',
    'Indrel RVV440D',
    'Unidade de Armazenamento Secundário',
    2.00,
    8.00,
    'INATIVO',
    NOW()
),
(
    'FRZ-BUT-2026-007',
    'Vestfrost VF40086',
    'Sala de Conservação - Ala B',
    -30.00,
    -15.00,
    'OPERACIONAL',
    NOW()
),
(
    'FRZ-BUT-2026-008',
    'Thermo Scientific TSX400',
    'Centro de Pesquisa de Vacinas',
    -80.00,
    -65.00,
    'ALERTA',
    NOW()
),
(
    'FRZ-BUT-2026-009',
    'Panasonic MDF-U5412',
    'Depósito Municipal de Imunobiológicos',
    -25.00,
    -10.00,
    'MANUTENCAO',
    NOW()
),
(
    'FRZ-BUT-2026-010',
    'Elber CSV 500',
    'Sala de Emergência Epidemiológica',
    2.00,
    8.00,
    'OPERACIONAL',
    NOW()
);