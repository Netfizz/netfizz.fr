        </div> <!-- /.wrap -->
    </div> <!-- /#content -->
<footer>
    <ul>
        <li><a href="https://github.com/Netfizz" target="_blank" data-tooltip="Voir mon profil Github"><i class="icon-github"></i></a></li>
        <li><a href="https://twitter.com/netfizz" target="_blank" data-tooltip="Suivez-moi sur Twitter"><i class="icon-twitter"></i></a></li>
        <li><a href="https://www.linkedin.com/in/mathieubarber" target="_blank" data-tooltip="Voir mon profil LinkedIn"><i class="icon-linkedin"></i></a></li>
        <li><a href="/mentions-legales">Mentions Légales</a></li>
    </ul>
</footer>
<!--[if lt IE 10]>
<p id="browserupgrade">Vous utilisez un <strong>vieux navigateur</strong>. Pour améliorer votre expérience <a href="http://browsehappy.com/">mettez à jour votre navigateur</a> s'il vous plaît.</p>
<![endif]-->
<?php
    if(getenv('APP_DEBUG'))
    {
        echo '<script> var debug = false; </script>';
    }
?>
<script src="<?php echo asset('js/app.js')?>"></script>
<script>
    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='https://www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
    ga('create','<?php echo getenv('GA') ?>','auto');ga('send','pageview');
</script>
<div id="preloader"><div></div><div></div></div>
</body>
</html>