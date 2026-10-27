// Aula 06: Desafio extra - Sentinela com validação de método
// Só aceita GET em /status (outros métodos recebem 405).

import http from 'http';

const PORTA = 3000;
const servidor = http.createServer((req, res) => {
    // Separa o caminho (pathname) de ?parametros
    const { pathname } = new URL(
        req.url,
        `http://${req.headers.host}`,
    );
    console.log(
        `Método: ${req.method} | Rota: ${pathname}`,
    );

    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Type', 'application/json');

    if (pathname === '/status') {
        if (req.method !== 'GET') {
            res.writeHead(405, { Allow: 'GET' });
            res.end(
                JSON.stringify({
                    erro: 'Método não permitido',
                }),
            );
            return;
        }

        res.writeHead(200);
        res.end(JSON.stringify({ servidor: 'online' }));
        return;
    }

    res.writeHead(404);
    res.end(
        JSON.stringify({ erro: 'Página não encontrada' }),
    );
});

servidor.listen(PORTA, () => {
    console.log(
        `Sentinela ativo! http://localhost:${PORTA}`,
    );
});
