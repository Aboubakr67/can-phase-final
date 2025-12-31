# CAN 2025 - Phase Finale

Bracket interactif pour suivre la phase finale de la Coupe d'Afrique des Nations 2025.

## 🏆 Fonctionnalités

- ✅ Bracket complet (1/8 → Finale + Petite finale)
- ✅ 16 équipes avec drapeaux réels
- ✅ Saisie des scores en temps réel
- ✅ Gestion des tirs au but
- ✅ Sauvegarde automatique (LocalStorage)
- ✅ Design responsive avec Tailwind CSS
- ✅ Animations et confettis

## 🚀 Déploiement sur VPS avec Kubernetes

### 1. Cloner le projet

```bash
git clone https://github.com/Aboubakr67/can-phase-final.git
cd can-phase-final
```

### 2. Build l'image Docker

```bash
docker build -t can-phase-final:latest .
```

### 3. Déployer sur Kubernetes

```bash
cd k8s
kubectl apply -f can-phase-final-deployment.yaml
kubectl apply -f can-phase-final-service.yaml
kubectl apply -f can-phase-final-ingress.yaml
```

### 4. Vérifier le déploiement

```bash
kubectl get pods
kubectl get ingress
```

## 🌐 Accès

L'application sera accessible sur : **https://can.akrzen.cloud**

## 🛠️ Technologies

- HTML/CSS/JavaScript
- Tailwind CSS
- Nginx
- Docker
- Kubernetes
- Traefik (Ingress)
- Let's Encrypt (SSL)
