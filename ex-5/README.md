# Questões

> Que decisões envolveram a escolha da nomenclatura dos recursos?

O tipo de retorno?? (Não entendi muito a pergunta)

> Que cabeçalhos HTTP estiveram envolvidos para garantir as quatro diretrizes acima?

Foram usados os headers de `Accept` da *request* para saber o tipo da resposta (`json` ou `xml`) e `Content-Type` e `Location` da *response*, para setar o tipo da da resposta e próximo destino, respectivamente. Nenhum outro cabeçalho é necessário para garantir as diretrizes acima.
