# Test configuration - FUTURE/INTEGRATING
## Estructura
A continuación, las carpetas que cuelgan de ./tests/
### `vitest`
#### `<cat>`
De aquí cuelgan familias de categorías para 'vitest', tendremos:
- unit
- etc...
### `pw`
De aquí cuelgan familias de categorías para 'playwright', tendremos:
- {Aqui hay que hacer una lista de las categorias que habran finalmente, exluyendo las que hayan sido traspasadas a vitest}

## Comandos
{POR_DEFINIR - AHORA NO}
## Flujos
### husky
#### Commit
- No 4. npm run perf:check
#### Push
- No 1.
- 2. -> `pw:cov`
- SI 3.
- 4. npm run perf:check
### CI/CD (github Actions)
#### Push
- NO TEST (only next.js -- build, npx)
#### PR 'main'
- FULL
- 1. test:cov
- 2. perf
- 3. perf:check
- Post comment con métricas  
#### Push 'main'
- 1. vitest:cov