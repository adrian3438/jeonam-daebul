const { createServer } = require('http');
const express = require('express');
const next = require('next');
const path = require('path');
const mysql = require('mysql2');
const axios = require('axios');
const multer = require('multer');
const cors = require('cors');
const cheerio = require('cheerio');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    const httpServer = createServer(server);
    server.use(cors())
    server.use(express.json())
    server.get(`/api/getLink` , async (req , res) => {
        const { url } = req.query;

        try {
            const response = await axios.get(url)
            const html = response.data;
            const $ = cheerio.load(html);
            const getTitle = () => $('head > title').text() || '';
            const getDescription = () => $('meta[name="description"]').attr('content') || '';
            const getImage = () => $('meta[property="og:image"]').attr('content') || '';
        
            const metadata = {
                success: 1,
                meta: {
                    title: getTitle(),
                    description: getDescription(),
                    image: {
                        url: getImage()
                    }
                }
            };
        
            res.json(metadata);
        }catch {
            console.log('error')
        }
    })

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT || 3000;

    httpServer.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});