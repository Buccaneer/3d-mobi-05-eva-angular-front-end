(function() {

  'use strict';

  angular
    .module('eva21DayChallengeApp').config(function($stateProvider, $urlRouterProvider,
      $translateProvider, $mdThemingProvider, uiGmapGoogleMapApiProvider,
      $httpProvider, $mdDateLocaleProvider) {
      $urlRouterProvider.otherwise('/home');

      $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('L');
      };
      $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'L', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
      };

      $translateProvider.translations('en', {
        "type": "Type",
        "Restaurant": "Restaurant",
        "Recipe": "Recipe",
        "CreativeCooking": "Creative Cooking",
        "Suikervrij": "Sugarfree",
        "RegionRecipe": "Foreign Recipe",

        "nav": {
          "home": "Home",
          "main": "Main Menu",
          "register": "Create account",
          "login": "Sign in",
          "logout": "Log out",
          "history": "History",
          "settings": "Settings",
          "about": "About"
        },
        "home": {
          "title": "Make it vegan!",
          "headline": "We challenge you to complete one of our challenges each day, for 21 days straight!",
          "text-signup-login": "If you think you've got what it takes, you can sign up or login and get started.",
          "text-about": "Take a look below to see how the website works!",
          "about": "How does it work?",
          "about-intro-1": "With this application you can discover the world of vegetables by completing daily challenges.",
          "about-step-1-title": "You register and/or sign in on the website",
          "about-step-1-text": "We'll ask a few questions the first time you log in, that way we can personalize all the challenges.",
          "about-step-2-title": "You're logged in",
          "about-step-2-text": "In case you already have a challenge for today, you'll get to view the challenge and the time that's left to complete it. If you do not have a challenge, you'll be able to request one. Furthermore you can look at the achievements you have unlocked and the previous challenges.",
          "about-step-3-title": "Receiving a new challenge",
          "about-step-3-text": "You can view the details of the challenge by clicking on it. You can also start a new one and take a look at the different type of challenges.",
          "about-step-4-title": "Completing a challenge",
          "about-step-4-text": "If you completed the challenge, don't forget to mark it as done on the bottom of the detailed view!",
          "about-step-5": "Congratulations, you just completed your first challenge!"
        },
        "main": {
          "welcome": "Welcome back, ",
          "checkDetails": "Details",
          "noChallenge": "You don't have a challenge for today!",
          "newChallenge": "New challenge"
        },
        "login": {
          "title": "Sign in",
          "email": "Email address",
          "emailPlaceholder": "example@example.com",
          "password": "Password",
          "passwordPlaceholder": "Enter your password",
          "loginButton": "Login",
          "noAccount": "Don't have an account?",
          "signInWith": "Sign in with ",
          "errors": {
            "passwordRequired": "Your password is required",
            "emailRequired": "Your email address is required",
            "emailInvalid": "That email address is invalid",
            "alreadyLoggedIn": "You are already logged in!",
            "socialLoginDisabled": "Sorry! Logging in with social accounts is unavailable"
          }
        },
        "register": {
          "signUp": "Register",
          "email": "@:login.email",
          "emailPlaceholder": "@:login.emailPlaceholder",
          "password": "@:login.password",
          "passwordPlaceholder": "@:login.passwordPlaceholder",
          "passwordConfirmation": "Confirm password",
          "registerButton": "Register",
          "errors": {
            "passwordRequired": "Your password is required",
            "emailRequired": "Your email address is required",
            "emailInvald": "That email address is invalid",
            "passwordMinLength": "Password has to be 6 characters long.",
            "passwordConfirmation": "Passwords are not equal"
          }
        },
        "challenges": {
          "new": "Request a new challenge!",
          "timeLeft": "Time left:",
          "pointsToEarn": "Points to earn:",
          "txt_takeChallenge": "Pick this challenge?",
          "btn_yes": "Yes",
          "btn_no": "No",
          "btn_done": "Done!",
          "txt_alreadyDone": "You have already done this challenge!",
          "create": {
            "choose": "Choose one of the following challenges!",
            "recipe": "Recipe",
            "recipe-text": "Prepare one of our recipes.",
            "recipe-region": "Exotic recipe",
            "recipe-region-text": "Explore the corners of the world and learn what different cultures have to offer!",
            "restaurant": "Restaurant",
            "restaurant-text": "No time to cook? Try a vegan restaurant.",
            "creative-cooking": "Creative Cooking",
            "creative-cooking-text": "Clean your fridge and prepare a meal with what your fridge has to offer.",
            "sugarfree": "Sugarfree",
            "sugarfree-text": "Done with sugar!"
          },
          "sugarfree": {
            "title": "Sugarfree",
            "description1": "In this challenge, it's intended that you eat sugar free for a whole day.",
            "description2": "There are different kinds of sugar and a lot of them are refined or produced with animal remains. For example, cow bones are used to give sugar his bright white color.",
            "description3": "We challenge you to avoid all (or as much as possible) products with sugar in it. This means no soft drinks, candy and so on."
          }
        },
        "recipe": {
          "choose": "Select one of the following recipes:",
          "pick": "Choose a recipe"
        },
        "loading": {
          "main": "Please wait!",
          "challenge": "Loading challenges",
          "recipes": "Finding recipes",
          "login": "Please wait!",
          "register": "@:loading.login",
          "social": "Contacting Google, Twitter or Facebook at the moment.",
          "challenges": "Selecting some challenges for you!",
          "settings": "Trying to find out more about you...",
          "restaurants": "We're looking for some spots for you!"
        },
        "about": {
          "title": "About",
          "text": "The EVA 21 days challenge was developed for EVA vzw.",
          "text-second": "This app wants to inspire people to eat more vegan for 21 days and convince them to use less animal-related products and more alternatives.",
          "info": "If you want to read more about the goal of EVA, you can always go to their ",
          "site": "website."
        },
        "settings": {
          "userSettings": "Settings",
          "firstname": "First name",
          "lastname": "Last name",
          "birthdate": "Date of birth",
          "allergies": "Your allergies",
          "budget": "What is your budget?",
          "typeOfVegan": "Are you vegetarian?",
          "peopleInFamily": "Number of people in your household",
          "save": "Confirm"
        },
        "badges": {
          "level1": "Current level: 1 (Seed)",
          "level2": "Current level: 2 (Root)",
          "level3": "Current level: 3 (Stem)",
          "level4": "Current level: 4 (Leaf)",
          "level5": "Current level: 5 (Bud)",
          "level6": "Current level: 6 (Flower)",
          "starter-title": "Starter",
          "starter-desc": "You have requested your first challenge.",
          "sugarrush-title": "Sugar rush",
          "sugarrush-desc": "You have completed your first sugarfree challenge! A day without added sugars, quite the achievement!",
          "creatieveling-title": "Creative mind",
          "creatieveling-desc": "You have complete your first vegan recipe!!",
          "explorer-title": "Explorer",
          "explorer-desc": "You have prepared your first exotic meal!",
          "gastronoom-title": "Gastronomist",
          "gastronoom-desc": "You have gone three times to a restaurant, gastronomic.",
          "genieter-title": "Enjoyer",
          "genieter-desc": "You have accomplished your first restaurantchallenge!",
          "trotsegebruiker-title": "Proud user",
          "trotsegebruiker-desc": "You already have finished ten challenges, keep it up!",
          "doorzetter-title": "Go-getter",
          "doorzetter-desc": "You have successfully completed the 21 days, congratulations!"
        },

        "restaurant": {
          "distance": "Distance to restaurant",
          "info-1": "We use your location to recommend vegan restaurants in your area.",
          "info-2": "When you prefer not to use locationservices, we will use the center of Ghent instead, with a range of 20km",
          "info-3": "When you agree you can press the button and continue.",
          "use-loc": "Use my location!",
          "find": "Find restaurants"
        },

        "region": {
          "Oosters": "Eastern",
          "Afrikaans": "African",
          "Zuid-Amerikaans": "South American",
          "Westers": "Western",
          "choose": "Choose a region"
        }


      });

      $translateProvider.translations('nl', {
        "___comment": "niks",

        "Low": "laag",
        "Medium": "gemiddeld",
        "High": "hoog",
        "Not Shared":"niet gedeeld",

        "Omnivore": "Omnivoor",
        "Pescetarian": "Pescotariër",
        "Parttime vegetarian": "Deeltijds vegetariër",
        "Vegetarian": "Vegetariër",
        "Vegan": "Veganistisch",
        "Other": "Andere",


        "type": "Soort",
        "Restaurant": "Restaurant",
        "Recipe": "Recept",
        "CreativeCooking": "Creative Cooking",
        "Suikervrij": "Suikervrij",
        "RegionRecipe": "Uitheems recept",

        "nav": {
          "home": "Startpagina",
          "main": "Hoofdmenu",
          "register": "Nieuw account",
          "login": "Aanmelden",
          "history": "Geschiedenis",
          "logout": "Uitloggen",
          "settings": "Instellingen",
          "about": "Over"
        },
        "home": {
          "title": "Maak het plantaardig!",
          "headline": "Welkom op de 21 day challenge website!",
          "text-signup-login": "Indien u klaar bent om de uitdaging aan te gaan, kan u zich hieronder aanmelden of registreren.",
          "text-about": "Lees hieronder hoe het werkt!",
          "about": "Hoe werkt het?",
          "about-intro-1": "Met deze applicatie kan u de wereld van plantaardig eten ontdekken door middel van challenges die u elke dag kan uitvoeren.",
          "about-step-1-title": "Je schrijft je in en/of meld je aan",
          "about-step-1-text": "De eerste keer dat je inlogt vragen we om een paar gegevens in te vullen, zo kunnen we de uitdagingen personaliseren voor iedere gebruiker.",
          "about-step-2-title": "Je bent ingelogd",
          "about-step-2-text": "Indien je al een uitdaging hebt voor vandaag, dan krijg je deze bovenaan te zien met daarbij de resterende tijd. Als je nog geen uitdaging hebt, kan je er één aanvragen. Verder kan je de behaalde prestaties en de vorige uitdagingen bekijken.",
          "about-step-3-title": "Een nieuwe uitdaging verkrijgen",
          "about-step-3-text": "Je kan de details van de uitdaging bekijken door er eenvoudigweg op te klikken. Je kan er ook een nieuwe uitdaging beginnen. Bekijk zeker en vast de verschillende soorten uitdagingen.",
          "about-step-4-title": "Een uitdaging vervolledigen",
          "about-step-4-text": "Indien je de uitdaging vervolledigd hebt, vergeet dan niet om dit aan te duiden door onderaan bij de details op de knop te drukken!",
          "about-step-5": "Proficiat, je hebt je eerste uitdaging vervolledigd!"
        },
        "main": {
          "welcome": "Welkom terug, ",
          "checkDetails": "Bekijk details",
          "noChallenge": "Je hebt nog geen challenge voor vandaag!",
          "newChallenge": "Nieuwe challenge"
        },
        "login": {
          "title": "Aanmelden",
          "email": "Email-adres",
          "emailPlaceholder": "voorbeeld@voorbeeld.com",
          "password": "Wachtwoord",
          "passwordPlaceholder": "Geef uw wachtwoord in",
          "loginButton": "Inloggen",
          "noAccount": "Nog geen account?",
          "signInWith": "Inloggen met ",
          "errors": {
            "passwordRequired": "Uw wachtwoord is verplicht",
            "emailRequired": "Uw email adres is verplicht",
            "emailInvalid": "Dit is geen geldig email adres",
            "alreadyLoggedIn": "U bent al aangemeld!",
            "socialLoginDisabled": "Sorry! Inloggen met sociale media is niet beschikbaar"
          }
        },
        "register": {
          "signUp": "Registreren",
          "email": "@:login.email",
          "emailPlaceholder": "@:login.emailPlaceholder",
          "password": "@:login.password",
          "passwordPlaceholder": "@:login.passwordPlaceholder",
          "passwordConfirmation": "Bevestig paswoord",
          "registerButton": "Registreer",
          "errors": {
            "passwordRequired": "@:login.errors.passwordRequired",
            "emailRequired": "@:login.errors.emailRequired",
            "emailInvalid": "@:login.errors.emailInvalid",
            "passwordMinLength": "Wachtwoord moet minstens 6 karakters tellen",
            "passwordConfirmation": "Wachtwoorden komen niet overeen"
          }
        },
        "challenges": {
          "new": "Nieuwe challenge aanvragen",
          "timeLeft": "Resterende tijd:",
          "pointsToEarn": "Te verdienen punten:",
          "txt_takeChallenge": "Kies deze challenge?",
          "btn_yes": "Ja",
          "btn_no": "Nee",
          "btn_done": "Volbracht!",
          "txt_alreadyDone": "Je hebt deze challenge al gedaan!",

          "create": {
            "choose": "Kies één van deze uitdagingen!",
            "recipe": "Recept",
            "recipe-text": "Maak één van onze gerechten klaar.",
            "recipe-region": "Uitheems recept",
            "recipe-region-text": "Leer de uithoeken van de wereld kennen en maak een gerecht uit een ander deel van de wereld klaar!",
            "restaurant": "Restaurant",
            "restaurant-text": "Geen zin om te koken? Probeer deze restaurants eens.",
            "creative-cooking": "Creative Cooking",
            "creative-cooking-text": "Kuis je koelkast uit met deze recepten die gebaseerd zijn op wat je hebt liggen.",
            "sugarfree": "Suikervrij",
            "sugarfree-text": "Weg met de suiker!"
          },
          "sugarfree": {
            "title": "Suikervrij",
            "description1": "Bij deze challenge is het de bedoeling dat je een hele dag lang suikervrij leeft.",
            "description2": "Er zijn verschillende soorten suikers en een groot aantal daarvan zijn verfijnd en bewerkt met dierlijke producten. Zo worden bijvoorbeeld resten van koeierbeenderen gebruikt om de witte kleur te geven.",
            "description3": "We dagen je uit om een dag geen (of toch zo weinig mogelijk) suikers te eten. Dit wil zeggen dat frisdrank, snoep en dergelijke vermeden worden."
          }
        },
        "recipe": {
          "choose": "Kies één van de volgende recepten:",
          "pick": "Kies een recept"
        },
        "loading": {
          "main": "Even geduld!",
          "challenge": "We zijn deze challenge aan het laden.",
          "recipes": "We zijn wat recepten aan het zoeken!",
          "login": "Even geduld!",
          "register": "@:loading.login",
          "social": "Even Google, Facebook en Twitter contacteren.",
          "challenges": "We zijn wat challenges aan het uitzoeken!",
          "settings": "Even wat gegevens over je ophalen...",
          "restaurants": "We zoeken wat plekjes voor je uit!"
        },
        "about": {
          "title": "Over",
          "text": "De EVA 21 dagen challenge werd ontwikkeld in naam van EVA vzw.",
          "text-second": "Deze app wil mensen aanzetten om 21 dagen plantaardig te eten om hen te overtuigen om minder dierlijke producten te gebruiken en meer alternatieven te nemen.",
          "info": "Als je meer informatie wil weten over de werking van EVA, dan kun je altijd terecht op hun ",
          "site": "website."
        },
        "settings": {
          "userSettings": "Instellingen",
          "firstname": "Voornaam",
          "lastname": "Achternaam",
          "birthdate": "Geboortedatum",
          "allergies": "Uw allergieën",
          "budget": "Wat is uw budget?",
          "typeOfVegan": "Bent u vegetariër?",
          "peopleInFamily": "Aantal gezinsleden",
          "save": "Bevestigen"
        },
        "badges": {
          "level1": "Huidig niveau: 1 (Zaadje)",
          "level2": "Huidig niveau: 2 (Wortel)",
          "level3": "Huidig niveau: 3 (Stengel)",
          "level4": "Huidig niveau: 4 (Blaadje)",
          "level5": "Huidig niveau: 5 (Knop)",
          "level6": "Huidig niveau: 6 (Bloem)",
          "starter-title": "Starter",
          "starter-desc": "Je hebt je eerste challenge aangevraagd.",
          "sugarrush-title": "Suiker kick",
          "sugarrush-desc": "Je hebt je eerste sugarfree challenge voltooid! Een hele dag zonder toegevoegde suiker wat een prestatie!",
          "creatieveling-title": "Creatieveling",
          "creatieveling-desc": "Je hebt zelf je eerste veganistisch gerecht in elkaar gestoken!",
          "explorer-title": "Wereldreiziger",
          "explorer-desc": "Je hebt een exotisch gerecht klaargemaakt!",
          "gastronoom-title": "Gastronoom",
          "gastronoom-desc": "Je bent al drie maal op restaurant geweest, gastronomisch.",
          "genieter-title": "Genieter",
          "genieter-desc": "Je hebt je eerste restaurantchallenge voltooid!",
          "trotsegebruiker-title": "Trotse gebruiker",
          "trotsegebruiker-desc": "Je hebt reeds 10 challenges voltooid. Ga zo door!",
          "doorzetter-title": "Doorzetter",
          "doorzetter-desc": "Je hebt de 21 dagen successvol ten einde gebracht!"
        },

        "restaurant": {
          "distance": "Afstand tot het restaurant",
          "info-1": "We gebruiken uw locatie zodat we vegetarische restaurants in uw directe omgeving kunnen aanraden.",
          "info-2": "Indien u dit niet wenst kan u locatievoorzieningen voor deze app negeren en zal de app het centrum van Gent als aangeraden locatie gebruiken, met een straal van 20km.",
          "info-3": "Indien u hiermee akkoord bent kan u hieronder op de knop drukken.",
          "use-loc": "Gebruik mijn locatie!",
          "find": "Zoek restaurants"
        },

        "region": {
          "Oosters": "Oosters",
          "Afrikaans": "Afrikaans",
          "Zuid-Amerikaans": "Zuid-Amerikaans",
          "Westers": "Westers",
          "choose": "Kies een regio"
        }
      });

      $translateProvider.translations('fr', {


        "Low": "bas",
        "Medium": "moyen",
        "High": "haut",
        "Not Shared":"pas partagé",

        "Omnivore": "Omnivore",
        "Pescetarian": "Pescétarien",
        "Parttime vegetarian": "Végétarien à temps partiel",
        "Vegetarian": "Végétarien",
        "Vegan": "Végétalien",
        "Other": "Autre",

        "type": "Type",
        "Restaurant": "Restaurant",
        "Recipe": "Recette",
        "CreativeCooking": "Creative Cooking",
        "Suikervrij": "Sans sucre",
        "RegionRecipe": "Recette d'une région",

        "nav": {
          "home": "Page d'acceuil",
          "main": "Menu principal",
          "register": "Inscription",
          "login": "Connexion",
          "history": "Historique",
          "logout": "Déconnecter",
          "settings": "Paramètres",
          "about": "À propos"
        },
        "home": {
          "title": "Explorer la nature!",
          "headline": "Bienvenue sur le site '21 day challenge'!",
          "text-signup-login": "Si vous êtes prêts à relever le défi, vous pouvez vous annoncer ou vous enregister ci-dessous.",
          "text-about": "Lisez ci-dessous comment cela fonctionne!",
          "about": "Comment cela fonctionne?",
          "about-intro-1": "Cette application vous permet de découvrir le monde de la nouriture végétale au moyen de challenge que vous pouves exécuter chaque jour.",
          "about-step-1-title": "Vous vous inscrivez et/ou vous vous annoncez",
          "about-step-1-text": "La première fois que vous vous connectez, nous demandons de compléter certaines données, de cette manière nous pouvons personaliser les défis pour chaque utilisateur.",
          "about-step-2-title": "Vous êtes connecté",
          "about-step-2-text": "Si vous avez déjà un défi pour aujourd'hui, vous le voyez ci-dessus avec le temps restant. Si vous n'avez pas encore de défi, vous pouvez en demander un. Ci-après vous pouvez consulter les prestations ottenues et les défis précédents.",
          "about-step-3-title": "Obtenir un nouveau défi",
          "about-step-3-text": "Vous pouvez consulter les détails du défi en cliquant tout simplement dessus. Vous pouvez également commencer un nouveau challenge. Consultez absolument les différents sortes de défis.",
          "about-step-4-title": "Accomplir un défi",
          "about-step-4-text": "Si vous avez réussi votre défi, n'oubliez pas de l'indiquer en cliquant sur le bouton, ci-dessous dans les détails!",
          "about-step-5": "Félicitations, vous avez réussi votre premier défi!"
        },
        "main": {
          "welcome": "Bienvenue, ",
          "checkDetails": "Regardez les détails",
          "noChallenge": "Vous n'avez pas encore de défi pour aujourd'hui!",
          "newChallenge": "Nouveau défi"
        },
        "login": {
          "title": "Connexion",
          "email": "Adresse e-mail",
          "emailPlaceholder": "exemple@exemple.com",
          "password": "Mot de passe",
          "passwordPlaceholder": "Introduisez votre mot de passe",
          "loginButton": "Se connecter",
          "noAccount": "Ni de compte?",
          "signInWith": "Se connecter avec",
          "errors": {
            "passwordRequired": "Votre mot de passe est obligatoire",
            "emailRequired": "Votre adresse e-mail est obligatoire",
            "emailInvalid": "Ceci n’est pas une adresse e-mail valide",
            "alreadyLoggedIn": "Vous êtes déjà connecté!",
            "socialLoginDisabled": "Désolé, s’identifier avec un réseau social n’est pas disponible"
          }
        },
        "register": {
          "signUp": "Inscription",
          "email": "@:login.email",
          "emailPlaceholder": "@:login.emailPlaceholder",
          "password": "@:login.password",
          "passwordPlaceholder": "@:login.passwordPlaceholder",
          "passwordConfirmation": "Confirme le mot de passe",
          "registerButton": "Inscription",
          "errors": {
            "passwordRequired": "@:login.errors.passwordRequired",
            "emailRequired": "@:login.errors.emailRequired",
            "emailInvalid": "@:login.errors.emailInvalid",
            "passwordMinLength": "Votre mot de passe doit comporter au minimum 6 caractères",
            "passwordConfirmation": "Les mots de passe ne sont pas identiques"
          }
        },
        "challenges": {
          "new": "Demander un nouveau défi",
          "timeLeft": "Temps restant:",
          "pointsToEarn": "Points à gagner:",
          "txt_takeChallenge": "Choisissez ce défi?",
          "btn_yes": "Oui",
          "btn_no": "Non",
          "btn_done": "Réussi!",
          "txt_alreadyDone": "Vous avez déjà fait ce défi!",

          "create": {
            "choose": "Choisis un de ces défis!",
            "recipe": "Recette",
            "recipe-text": "Préparez un de ces recettes.",
            "recipe-region": "Recette exotique",
            "recipe-region-text": "Découvrez les fins fonds du monde et réalisez un plat d'une autre partie du monde!",
            "restaurant": "Restaurant",
            "restaurant-text": "Tu n'a pas envie de cuisiner? Essayez ces restaurants.",
            "creative-cooking": "Creative Cooking",
            "creative-cooking-text": "Videz votre frigo en réalisant ces recettes qui sont basées sur ce que vous disposez.",
            "sugarfree": "Sans sucre",
            "sugarfree-text": "À bas le sucre!"
          },
          "sugarfree": {
            "title": "Sans sucre",
            "description1": "Dans ce défi, il est prévu que vous mangez du sucre gratuitement pendant une journée entière.",
            "description2": "Il existe différents types de sucre et beaucoup d'entre eux sont affinés ou fabriqués avec des restes d'animaux. Par exemple, os de vache sont utilisés pour donner sa couleur sucre blanc brillant.",
            "description3": "Nous vous défions d'éviter toutes (ou autant que possible) produits avec du sucre. Cela signifie pas de boissons gazeuses, les bonbons et ainsi de suite."
          }
        },
        "recipe": {
          "choose": "Choisis une des recettes suivante:",
          "pick": "Choisis une recette"
        },
        "loading": {
          "main": "Un peu de patience!",
          "challenge": "Nous chargeons ce défi.",
          "recipes": "Nous cherchons des recettes!",
          "login": "Un peu de patience!",
          "register": "@:loading.login",
          "social": "Un instant, nous contactons Google, Facebook et Twitter.",
          "challenges": "Nous recherchons des défis!",
          "settings": "Récupérer quelques données sur vous...",
          "restaurants": "Nous cherchons quelques places pour vous!"
        },
        "about": {
          "title": "À propos",
          "text": "Le challenge EVA 21 jours a été développé au nom de l’A.S.B.L. EVA.",
          "text-second": "Cette application veut encourager des personnes à manger plus végétal durant 21 jours  pour les convaincre d’utiliser moins de produits animaliers et de choisir plus d’alternatives.",
          "info": "Si vous souhaitez obtenir plus d’informations sur le travail d’EVA, alors vous pouvez toujours consulter leur ",
          "site": "site internet."
        },
        "settings": {
          "userSettings": "Paramètres",
          "firstname": "Prénom",
          "lastname": "Nom",
          "birthdate": "Date de naissance",
          "allergies": "Vos allergies",
          "budget": "Quel est votre budget?",
          "typeOfVegan": "Êtes-vous végétarien?",
          "peopleInFamily": "Nombre de personnes de votre ménage",
          "save": "Confirmer"
        },
        "badges": {
          "level1": "Niveau actuel: 1 (Graine)",
          "level2": "Niveau actuel: 2 (Racine)",
          "level3": "Niveau actuel: 3 (Tige)",
          "level4": "Niveau actuel: 4 (Feuille)",
          "level5": "Niveau actuel: 5 (Bouton)",
          "level6": "Niveau actuel: 6 (Fleur)",
          "starter-title": "Starter",
          "starter-desc": "Vous avez complétez votre premier défi.",
          "sugarrush-title": "Hâte de sucre",
          "sugarrush-desc": "Vous avez réussi votre premier defi sans sucre! Une journée entière sans ajouter de sucre, quelle prestation!",
          "creatieveling-title": "Créateur",
          "creatieveling-desc": "Vous avez même réalisé votre premier plat végitalien!",
          "explorer-title": "Explorateur",
          "explorer-desc": "Vous avez préparé un plat exotique!",
          "gastronoom-title": "Gastronome",
          "gastronoom-desc": "Vous avez déjà allé 3 fois au restaurant, impressionant.",
          "genieter-title": "Jouisseur",
          "genieter-desc": "Vous avez réussi votre premier défi de restaurant!",
          "trotsegebruiker-title": "Fier utilisateur",
          "trotsegebruiker-desc": "Vous avez déjà réussi 10 challenges. Continuez comme ça!",
          "doorzetter-title": "Tenance",
          "doorzetter-desc": "Vous avez arrivé au termine des 21 jours avec succés!"
        },

        "restaurant": {
          "distance": "Distance jusqu'au restaurant",
          "info-1": "Nous utilisons votre localisation. Afin que nous puissions vous conseiller les restaurants végétariens dans les environs immédiats.",
          "info-2": "Si vous ne les souhaitez pas, vous pouvez ignorer les proprietés de localisation et l'application. Conseillée dans un rayon de 20km.",
          "info-3": "Si vous étes d'accord, vous pouvez appuyer sur le bouton ci-dessous.",
          "use-loc": "Utilise ma localisation!",
          "find": "Cherche les restaurants"
        },

        "region": {
          "Oosters": "Oriental",
          "Afrikaans": "Africain",
          "Zuid-Amerikaans": "Sud Americain",
          "Westers": "Occidental",
          "choose": "Choisis une région"
        }
      });

      //setting up the states
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html',
          // controller: 'HomeCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('register', {
          url: '/register',
          templateUrl: 'views/register.html',
          controller: 'RegisterCtrl'
        })
        .state('main', {
          url: '/main',
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          requireAuth: true,
          resolve: {
            fetchUserInfoPromise: ['UserInfoService', function(UserInfoService) {
              return UserInfoService.getUserInfo();
            }],
            fetchChallengesPromise: ['ChallengeService', function(ChallengeService) {
              return ChallengeService.getChallenges();
            }]
          }
        })
        .state('settings', {
          url: '/settings',
          templateUrl: 'views/settings.html',
          controller: 'SettingsCtrl',
          requireAuth: true,
          resolve: {
            fetchUserInfo: ['UserInfoService', function(UserInfoService) {
              return UserInfoService.getUserInfo();
            }]
          }
        })
        .state('about', {
          url: '/about',
          templateUrl: 'views/about.html',
          requireAuth: true
        })
        .state('challenges-overview', {
          url: '/challenges',
          templateUrl: 'views/challenges/overview.html',
          controller: 'ChallengesCtrl',
          requireAuth: true,
          resolve: {
            fetchChallengesPromise: ['ChallengeService', function(ChallengeService) {
              return ChallengeService.getChallenges();
            }]
          }
        })
        .state('create-challenge', {
          url: '/challenge/create',
          templateUrl: 'views/challenges/create-challenge.html',
          controller: 'CreateChallengeCtrl',
          requireAuth: true
        })
        .state('challenge-overview', {
          url: '/challenge/:id',
          templateUrl: 'views/challenges/challenge.html',
          controller: 'ChallengeCtrl',
          requireAuth: true,
          resolve: {
            challenge: ['$stateParams', 'ChallengeService', function($stateParams, ChallengeService) {
              return ChallengeService.getChallenge($stateParams.id);
            }]
          }
        })
        .state('select-view-recipe', {
          url: '/challenge/create/recipe/agree',
          controller: 'AgreeRecipeCtrl',
          templateUrl: 'views/challenges/create-recipe-challenge-agree.html',
          requireAuth: true
        })
        .state('create-recipe-challenge', {
          url: '/challenge/create/recipe',
          templateUrl: 'views/challenges/create-recipe-challenge.html',
          controller: 'ChallengeRecipesCtrl',
          requireAuth: true,
          resolve: {
            fetchChallengesPromise: ['RecipeService', function(RecipeService) {
              return RecipeService.getRecipes();
            }]
          }
        })
        .state('create-recipe-rr-challenge', {
          url: '/challenge/create/region-recipe',
          templateUrl: 'views/challenges/create-region-recipe-challenge.html',
          controller: 'ChallengeRegionRecipesCtrl',
          requireAuth: true,
          resolve: {}
        })
        .state('select-view-creative-cooking', {
          url: '/challenge/create/creative-cooking',
          //controller: 'AgreeRecipeCtrl',
          templateUrl: 'views/challenges/create-creative-cooking.html',

          controller: 'CreativeCookingCtrl',
          requireAuth: true
        })
        .state('show-badges', {
          url: '/badges',
          templateUrl: 'views/badges.html',
          controller: 'BadgeCtrl',
          requireAuth: true,
          resolve: {
            fetchUserInfoPromise: ['UserInfoService', function(UserInfoService) {
              return UserInfoService.getUserInfo();
            }]
          }

        }).state('create-restaurant-challenge', {
          url: '/challenge/create/restaurant',
          templateUrl: '/views/challenges/create-restaurant-challenge.html',
          controller: 'RestaurantCtrl',
          requireAuth: true
        }).state('create-sugarfree-challenge', {
          url: '/challenge/create/sugarfree',
          templateUrl: '/views/challenges/create-sugarfree-challenge.html',
          controller: 'AgreeSugarfreeCtrl',
          requireAuth: true
        });

      $httpProvider.interceptors.push('authHttpResponseInterceptor');

      //let translateProvider load translations from external json
      // $translateProvider.useStaticFilesLoader({
      //   files: [{
      //     prefix: '../i18n/locale-',
      //     suffix: '.json'
      //   }]
      // });

      //register all available languages
      $translateProvider.registerAvailableLanguageKeys(['en', 'nl'], {
        'en_US': 'en',
        'en_UK': 'en',
        'en_CA': 'en',
        'nl_BE': 'nl',
        'nl_NL': 'nl',
        'fr_FR': 'fr',
        'fr_BE': 'fr',
        'fr_LU': 'fr',
        'fr_CH': 'fr',
        'fr_CA': 'fr'
      });

      //determine the language of the user and use it for translations
      $translateProvider.determinePreferredLanguage();
      //$translateProvider.preferredLanguage('fr');
      //if determined language isn't supported, fall back on english
      $translateProvider.fallbackLanguage('en');
      //safety measurements against XSS
      $translateProvider.useSanitizeValueStrategy('escapeParameters');

      //$mdThemingProvider.theme('app-dark', 'default');
      //    .primaryPalette('green');

      var theme = $mdThemingProvider.extendPalette('green', {
        '200': 'b3a59f',
        '500': 'afbd1f',
        'contrastDefaultColor': 'light'
      });
      var accent = $mdThemingProvider.extendPalette('green', {
        '500': '032d18',
        '200': '032d18'
      });
      var background = $mdThemingProvider.extendPalette('grey', {
        //'A100': 'b3a59f'
        //'hue-1':'400'
      });

      $mdThemingProvider.definePalette('primary', theme);
      $mdThemingProvider.definePalette('accent', accent);
      $mdThemingProvider.definePalette('background', background);
      $mdThemingProvider.theme('default').primaryPalette('primary').backgroundPalette('background');


      uiGmapGoogleMapApiProvider.configure({
        v: '3.20',
        libraries: 'weather,geometry,visualization'
      });
    });


})();
