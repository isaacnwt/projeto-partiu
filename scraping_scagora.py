import urllib.request
from bs4 import BeautifulSoup

# URL da seção de entretenimento do São Carlos Agora
url = 'https://www.saocarlosagora.com.br/entretenimento/'

# Cabeçalhos para a requisição HTTP
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'}

# Criando a requisição com o cabeçalho apropriado
req = urllib.request.Request(url, headers=headers)

# Palavras-chave que indicam eventos
palavras_chave_eventos = [
    'show', 'evento', 'musical', 'festa', 'teatro', 'festival', 
    'cinema', 'curso', 'feira', 'semana de', 'workshop', 'exposição', 
    'palestra', 'encontro', 'lançamento', 'competição', 'conferência', 
    'congresso', 'live', 'encontro', 'atividades', 'comemoração'
]

try:
    # Fazendo a requisição e recebendo a resposta
    print(f"Enviando requisição para a URL: {url}")
    response = urllib.request.urlopen(req)
    print(f"Requisição bem-sucedida! Status code: {response.status}")
    
    # Lendo o conteúdo da resposta
    html = response.read()
    print("Conteúdo HTML da página carregado com sucesso!")
    
    # Analisando o conteúdo HTML com BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')
    print("Conteúdo HTML analisado com BeautifulSoup.")
    
    # Encontrando os elementos que contêm as notícias
    noticias = soup.find_all('div', class_='linkNoticia')
    print(f"Notícias encontradas: {len(noticias)}")
    
    # Verificando se encontrou notícias
    if noticias:
        eventos_encontrados = 0
        # Iterando sobre as notícias
        for noticia in noticias:
            # Encontrando o título da notícia
            lista_noticia = noticia.find('div', class_='listaNoticia')
            if lista_noticia:
                link = lista_noticia.find('a')
                if link and link.get('title'):
                    titulo = link['title']
                else:
                    titulo = 'Título não encontrado'
                
                # Verificando se o título contém alguma palavra-chave relacionada a eventos
                if any(palavra in titulo.lower() for palavra in palavras_chave_eventos):
                    eventos_encontrados += 1
                    print(f"Evento encontrado: {titulo}")
                    
                    # Encontrando a data do evento
                    lista_data = noticia.find('div', class_='listaData')
                    if lista_data:
                        data_hora = lista_data.find('small')
                        data_hora = data_hora.get_text(strip=True) if data_hora else 'Data não informada'
                    else:
                        data_hora = 'Data não informada'
                    
                    print(f"Data e Hora: {data_hora}")
                    
                    # Link para mais detalhes
                    evento_link = link['href'] if link else 'Link não encontrado'
                    print(f"Link: {evento_link}\n")
        
        if eventos_encontrados == 0:
            print("Nenhum evento encontrado entre as notícias.")
    else:
        print("Nenhuma notícia encontrada na página.")
    
except urllib.error.URLError as e:
    print(f"Erro na requisição: {e}")
except Exception as e:
    print(f"Erro inesperado: {e}")
