# lexus-js
video animate
VIEW AS RAW FILE


#if there are bugs or errors when playing the animation :
  * for chrome/chromium users: disable hardware accelaration
      *open chrome://flags -> search for "Hardware-accelerated video decode" -> restart browser
      
  * add the in .php file
   ```php
      <?php
      header('Accept-Ranges: bytes');
      header('Cache-Control: no-cache');
      header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
      header("Cache-Control: post-check=0, pre-check=0", false);
      ?>
      ```
      
  * add this in .htaccess
     ```
      <IfModule mod_headers.c> 
      Header set Accept-Ranges bytes 
      </IfModule> 
      ````
