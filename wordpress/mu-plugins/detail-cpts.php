<?php
/**
 * Plugin Name: Detail — Tipos de Conteúdo
 * Description: Registra os CPTs consumidos pelo site Next.js via REST API.
 * Version: 1.0.0
 * Author: Eliel Cezar
 *
 * ⚠️ Este é um MU-PLUGIN. O arquivo vai solto em /wp-content/mu-plugins/,
 * NÃO dentro de uma subpasta — o WordPress só carrega PHP na raiz dessa
 * pasta. Mu-plugins não aparecem na lista de plugins e não podem ser
 * desativados por engano, que é o que queremos: desativar isto faria a
 * galeria e a equipe sumirem do site no build seguinte.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', function () {

    /**
     * Categoria da galeria.
     *
     * As fotos vivem no campo Galeria do ACF — fonte única de imagem deste
     * tipo. 'thumbnail' fica fora de `supports` de propósito: se existisse
     * imagem destacada, alguém a preencheria e ela seria silenciosamente
     * ignorada pelo site.
     *
     * 'page-attributes' é obrigatório — é o que habilita orderby=menu_order
     * na REST API. Sem ele, a chamada do site devolve HTTP 400.
     */
    register_post_type('galeria_categoria', [
        'labels' => [
            'name'               => 'Galeria',
            'singular_name'      => 'Categoria da Galeria',
            'add_new_item'       => 'Adicionar categoria',
            'edit_item'          => 'Editar categoria',
            'new_item'           => 'Nova categoria',
            'view_item'          => 'Ver categoria',
            'search_items'       => 'Buscar categorias',
            'not_found'          => 'Nenhuma categoria encontrada',
            'menu_name'          => 'Galeria',
        ],
        'public'              => true,
        // Não há frontend: o Detail Headless Mode redireciona tudo para o
        // painel. Desligar aqui evita gerar URLs públicas que dariam 404.
        'publicly_queryable'  => false,
        'exclude_from_search' => true,
        'has_archive'         => false,
        'show_ui'             => true,
        'show_in_rest'        => true,
        'rest_base'           => 'galeria_categoria',
        'menu_icon'           => 'dashicons-format-gallery',
        'menu_position'       => 20,
        'supports'            => ['title', 'page-attributes'],
    ]);

    /**
     * Membro da equipe. O nome da pessoa é o título do post.
     * Ordenação pelo campo "Ordem" (page-attributes), igual à galeria.
     */
    register_post_type('membro_equipe', [
        'labels' => [
            'name'               => 'Equipe',
            'singular_name'      => 'Membro da Equipe',
            'add_new_item'       => 'Adicionar membro',
            'edit_item'          => 'Editar membro',
            'new_item'           => 'Novo membro',
            'view_item'          => 'Ver membro',
            'search_items'       => 'Buscar membros',
            'not_found'          => 'Nenhum membro encontrado',
            'menu_name'          => 'Equipe',
        ],
        'public'              => true,
        'publicly_queryable'  => false,
        'exclude_from_search' => true,
        'has_archive'         => false,
        'show_ui'             => true,
        'show_in_rest'        => true,
        'rest_base'           => 'membro_equipe',
        'menu_icon'           => 'dashicons-groups',
        'menu_position'       => 21,
        'supports'            => ['title', 'page-attributes'],
    ]);

    /**
     * Card de catálogo (películas, limpeza, proteção premium).
     *
     * Guarda apenas os textos editáveis. A ordem, as tabelas de
     * especificação, as tonalidades e os logos de marca continuam em
     * src/data/*.ts — por isso este tipo não precisa de page-attributes:
     * o site localiza cada card pelo campo `id_card`, não pela ordem.
     */
    register_post_type('card_catalogo', [
        'labels' => [
            'name'               => 'Cards de Catálogo',
            'singular_name'      => 'Card de Catálogo',
            'add_new_item'       => 'Adicionar card',
            'edit_item'          => 'Editar card',
            'new_item'           => 'Novo card',
            'view_item'          => 'Ver card',
            'search_items'       => 'Buscar cards',
            'not_found'          => 'Nenhum card encontrado',
            'menu_name'          => 'Cards de Catálogo',
        ],
        'public'              => true,
        'publicly_queryable'  => false,
        'exclude_from_search' => true,
        'has_archive'         => false,
        'show_ui'             => true,
        'show_in_rest'        => true,
        'rest_base'           => 'card_catalogo',
        'menu_icon'           => 'dashicons-index-card',
        'menu_position'       => 22,
        'supports'            => ['title'],
    ]);

}, 10);

/**
 * Esconde do menu o que este WordPress não usa.
 *
 * A instalação existe só para alimentar o site: comentários não são lidos em
 * lugar nenhum e posts não têm destino no frontend. Deixá-los visíveis faz o
 * cliente publicar conteúdo que nunca aparece.
 */
add_action('admin_menu', function () {
    remove_menu_page('edit-comments.php');
    remove_menu_page('edit.php');
}, 99);
