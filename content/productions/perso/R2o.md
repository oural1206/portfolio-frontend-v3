---
title: 'R2o'
description: "Conception et programmation d'une carte électronique sur mesure pour une start-up.<br><br>Utilisation d'une RaspberryPi pour héberger une application web locale."
type: 'Projet personnel'
competences: [
  { name: 'VueJS', icon: 'vuejs.svg' },
  { name: 'AdonisJS', icon: 'adonisjs.svg' },
  { name: 'EasyEDA', icon: 'easyeda.svg' },
  { name: 'Bash', icon: 'bash.svg' },
  { name: 'Docker', icon: 'docker.svg' },
  { name: 'SQLite', icon: 'sqlite.svg' },
  { name: 'Arduino', icon: 'arduino.svg' },
  { name: 'Raspberry Pi', icon: 'raspberrypi.svg' }
]
cover: 'r2o/cover.png'
---

# Présentation
**R2o** est un projet que je mène avec _Emmanuel DAVID_ depuis 2024.
Il s'agit d'un système innovant de recyclage d'eau et de chaleur pour l'habitat. Ce système a été imaginé par Emmanuel depuis plusieurs années et celui-ci n'a cessé de le faire évoluer.

Cependant, il avait besoin de quelqu'un avec des connaissances plus approfondies que lui en électronique, et surtout en programmation afin que le projet avance.

<br>

# Objectifs

### 1. Conception de la carte électronique
Le système comprend plusieurs capteurs analogiques et numériques (débit d'eau, température, niveau d'eau), ainsi que des actionneurs (électrovannes, ...).
J'ai donc designé une carte électronique sur **EasyEDA** qui répondait à ces besoins.

La carte comporte un microcontrôleur **ATmega328P** qui communique avec une **RaspberryPi Zero 2** en UART en passant par un level shifter 3.3V <-> 5V.
L'entrée de la carte est en 12V pour alimenter les électrovannes (relais) mais elle est ensuite régulée en 5V pour le reste.
Les capteurs sont ensuite reliés à la carte électronique par des bornes à vis pour faciliter le branchement et la compatibilité.

![Photo du PCB](/assets/productions-img/r2o/pcb.png) <span class="center">*Photo du PCB sur le logiciel | après fabrication | après assemblage (non définitif)*</span>

### 2. Programmation de l'application web
Pour configurer le système, le surveiller et avoir des rapports sur les économies faites, j'ai choisi de faire une web app hébergée localement sur la **Raspberry Pi** (et accessible via **VPN**).

Pour cette application, j’ai choisi **VueJS** avec la librairie de composants **PrimeVue**. L’application est pensée **Mobile FIRST** car son utilisation est prévue sur téléphone, voire sur tablette.
Elle communique à l’aide d'une api avec des **Server-Sent-Event (SSE)** et des requêtes **REST** pour récupérer les données telles que les valeurs des capteurs en temps direct.

![Photo du PCB](/assets/productions-img/r2o/ui.png) <span class="center">*Photo du croquis de la home page et sa réalisation final*</span>

### 3. Backend et automatisations
L'api pour la web app et l'automatisation des séquences sont gérés par un serveur **AdonisJS**.
J'ai utilisé **SQLite** pour la base de données qui enregistre toutes les statistiques, les logs et les configurations du système.

La frontend et le backend sont conteneurisés avec **Docker** pour faciliter le déploiement et les mises à jour.
Les conteneurs sont build et push automatiquement avec une **GitHub Action**.
L'installation des mises à jour est autonome grâce à un script **Bash** après déclenchement sur l'interface web.

![Photo du PCB](/assets/productions-img/r2o/maj.jpg) <span class="center">*Screenshot de la page pour déclencher les mises à jour*</span>

# Et maintenant ?
Le projet avance à grands pas et prend une réelle tournure de startup : présentations à des concours de pitch, création d'une société, dépôt de brevet, étude de marché, ...

En attendant je continue de travailler sur le projet : design d'une nouvelle carte électronique, amélioration de l'application web, ajout de nouvelles fonctionnalités et correction des bugs.
