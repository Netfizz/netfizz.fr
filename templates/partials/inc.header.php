<!doctype html>
<html class="no-js no-touch" lang="fr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title><?php echo get($meta, 'title'); ?> - Netfizz</title>
    <meta name="description" content="<?php echo get($meta, 'description'); ?>">
    <meta name="keywords" content="<?php echo implode(', ', get($meta, 'keywords', [])); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<?php echo asset('css/app.css')?>">
</head>
<body>
    <div id="cover" data-perspective>
        <figure>
            <img src="/images/scene.jpg" alt="Vu de l'extérieur">
            <img src="/images/macbook-phpstorm.png" alt="Mon macbook">
            <img src="/images/head.png" alt="Mon profil">
        </figure>
    </div>
    <div id="content">
        <div class="wrap">
            <a href="/" title="Développeur web indépendant à Lyon" id="logo">
                <img src="/images/logo.png" alt="Logo Netfizz" />
            </a>