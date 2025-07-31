README-TESTES-FINAIS.md
Execute
npm start
Assim que ele mostrar a resposta << √ Compiled successfully.>
voce pode abrir em:
http://localhost:4200


### Outros comandos

Instalar Angular CLI globalmente se não tiver instalado
npm install -g @angular/cli


Depois execute :
ng serve

Fluxo de Trabalho Completo:
# Navegue até a pasta do frontend
cd /c/workspace-consultacredito/frontend-creditos

# Instale as dependências
npm install
npm ci << Use em vez o npm install >>
npm run test:ci <<(script específico para CI)>>

# Inicie o servidor de desenvolvimento
ng serve

# Ou se preferir usar npm scripts:
npm start

Configuração Recomendada no package.json:

Verifique se seu package.json tem estes scripts:
json

{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint"
  }
}

Se precisar limpar o cache do npm:
npm cache clean --force


# Teste com JEST
Instlando o JEST
npm install --save-dev jest jest-preset-angular@13 @types/jest ts-jest@12 @angular-builders/jest@20

npm test            # Execução normal
npm run test:watch  # Modo watch

Comando de cobertura para verificar áreas que precisam de mais testes
npm run test:coverage # Relatório de cobertura


Usando Jest com modo isolado:
bash

npx jest --runInBand --logHeapUsage --maxWorkers=4

Flags úteis para velocidade:

    --runInBand: Executa todos os testes no mesmo processo

    --maxWorkers=4: Limita o número de workers (ajuste para seu CPU)

    --shard: Divide testes entre múltiplas máquinas (para CI/CD)

    --onlyChanged: Executa apenas testes de arquivos modificados

# Para executar a aplicação
Para executar:
    Build SSR:
npm run build:ssr
    Servir aplicação SSR:
npm run serve:ssr:frontend-creditos

Para instalar as dependências:

npm install

Comandos importantes agora:
    Build SSR:

npm run build:ssr

    Executar SSR:

npm run serve:ssr

    Testes em CI:

npm run test:ci

    Relatório de cobertura:

npm run test:coverage