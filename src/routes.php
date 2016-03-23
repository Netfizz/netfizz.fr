<?php
// Routes

$app->get('/mentions-legales', function ($request, $response, $args) {

    // Set META
    $meta['title'] = 'Mentions légales';
    // Render index view
    return $this->renderer->render($response, 'mentions-legales.phtml', compact('meta'));
});


$app->post('/bonjour', function ($request, $response, $args) {

    // Honeypot anti-spam
    $data = $request->getParams();
    if (!empty($data) && empty(array_filter($data))) {
        //$subject = '[site] Bonjour';
        //$response->write('mailto:' . env('EMAIL') . '?subject=' . $subject);
        $response->write(env('EMAIL'));
    } else {
        $this->logger->info('SPAM', ['form' => $data, 'ip' => $_SERVER['REMOTE_ADDR']]);
    }

    return $response;
});


$app->get('/', function ($request, $response, $args) {

    // Set META
    $meta['title'] = 'Développeur Web full-stack indépendant à Lyon';
    $meta['description'] = 'Mathieu BARBER, développeur PHP freelance basé à Lyon, spécialiste Laravel (Framework PHP basé sur des bundles Symfony 2) et Vue.js (Framework JS comparable à Angular et React)';
    $meta['keywords'] = [
        'développeur full-stack',
        'développeur web',
        'développeur PHP',
        'développeur laravel',
        'développeur Vue.js',
        'développeur JS',
        'développeur front-end',
        'développeur back-end',
        'freelance',
        'indépendant',
        'développeur Lyon',
        'développeur Rhone'
    ];

    // Exp
    $developperSinceYear = date('Y') - 2003;

    // My age
    $age = DateTime::createFromFormat('Y-m-d', '1981-01-06')
        ->diff(new DateTime('now'))
        ->y;

    // Render index view
    return $this->renderer->render($response, 'index.phtml', compact('meta', 'developperSinceYear', 'age'));
});

