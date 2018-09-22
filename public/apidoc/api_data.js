define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "Status da API",
    "group": "Status",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensagem de status da API</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\"message\": \"Olá bem vindo a API do troca de usados\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routers/routes.js",
    "groupTitle": "Status",
    "name": "Get"
  }
] });
