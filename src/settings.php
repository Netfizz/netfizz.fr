<?php
return [
    'settings' => [
        'displayErrorDetails' => env('APP_DEBUG'), // set to false in production
        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],
        // Monolog settings
        'logger' => [
            'name' => 'netfizz',
            'path' => __DIR__ . '/../logs/app.log',
        ],
    ],
];