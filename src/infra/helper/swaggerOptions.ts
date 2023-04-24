export const swaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'API de Pintura',
    description: 'Documentação da API de Pintura',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  paths: {
    '/calculaQuantidadeTinta': {
      post: {
        summary: 'Calcula a quantidade de tinta necessária para pintar quatro paredes',
        description: 'Essa rota recebe um array com os dados de quatro paredes e retorna a quantidade de tinta necessária para pintá-las.',
        requestBody: {
          description: 'Array com os dados das quatro paredes',
          required: true,

          content: {
            'application/json': {
              schema: {
                type: 'array',
                minItems: 4,
                maxItems: 4,
                uniqueItems: true,
                items: {
                  $ref: '#/components/schemas/Parede',
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Retorna a quantidade de tinta necessária para pintar as quatro paredes',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    area: {
                      type: 'number',
                    },
                    litrosNecessarios: {
                      type: 'number',
                    },
                    latasNecessarias: {
                      type: 'array',
                      minItems: 4,
                      maxItems: 4,
                      uniqueItems: true,
                      items: {
                        type: 'object',
                        properties: {
                          tamanho: {
                            type: 'number'
                          },
                          quantidade: {
                            type: 'number'
                          },
                        }
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Parâmetros inválidos',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Parede: {
        type: 'object',
        properties: {
          altura: {
            type: 'number',
          },
          largura: {
            type: 'number',
          },
          quantidadeJanela: {
            type: 'number',
          },
          quantidadePorta: {
            type: 'number',
          },
        },
      },
    },
  },
}

export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API de Pintura',
      description: 'API de cálculo de quantidade de tinta necessária para pintar paredes',
      contact: {
        name: 'Seu Nome',
        email: 'seuemail@gmail.com',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['src/infra/api/rest/pintura-routes.ts'],
}
