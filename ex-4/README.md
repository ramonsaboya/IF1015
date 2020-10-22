# Questões

> Qual a vantagem de usar uma abordagem como gRPC ao invés de sockets?

A implementação fica muito mais fácil e facilita em aplicações com necessidade de protocolos.

> Ainda comparando-se com a abordagem utilizando sockets, qual o papel do Protocol Buffer nos exercícios acima? Há algum aumento de complexidade?

Os protos tem o papel de definir o protocolo de comunicação independente de linguagem de programação. Existe um aumento de complexidade com as particularidade da implementação na sintaxe de *proto3*.

> De forma geral, quais as principais diferenças entre as implementações da calculadora e dos chats?

A forma de lidar com as conexões, inclusive envolvendo identificar quedas e reconectar é facilitada com a utlização de RPC.
