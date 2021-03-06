import networkx as nx
import community #this is from python-louvain
import sys
import json


def communityDetect(G):
    communities = community.best_partition(G)
    result = json.dumps(communities)
    print(result)
    # 给图添加属性
    # nx.set_node_attributes(G,communities,'community')


def pageRank(G,node=None):
    pr=nx.pagerank(G)
    # pagerank = sorted(pr.items(), key=lambda item: item[1], reverse=True)
    str_pr = json.dumps(pr)
    print(str_pr)
    # 给图添加属性，并保存计算的结果
    # nx.set_node_attributes(G,pr,'pageRank')


def shortestPath(G, start, end):
    '''
    sp = nx.all_shortest_paths(G, source=start, target=end)
    spl = [spi for spi in sp]
    jsonStr = json.dumps(spl)
    print(jsonStr)  
    # print(len(spl),len(spl[0]))
    '''
    sp = nx.shortest_path(G, source=start, target=end)
    print(json.dumps(sp))


# if __name__ == "__main__":
try:
    algorithm = sys.argv[1]

    with open('./data/result.json',"r") as f:
        json_data = json.load(f)

    G = nx.readwrite.json_graph.node_link_graph(json_data)
    
    if algorithm == 'CD':
        communityDetect(G)
    elif algorithm == 'PR':
        pageRank(G)
    elif algorithm == 'SP':
        shortestPath(G, sys.argv[2], sys.argv[3])
    else:
        print("There is no such algorithm!")
except Exception as e:
    print('Exception:',e)
else:
    # 保存当前图的结果
    # if algorithm != 'SP':
    #     json_G = nx.readwrite.json_graph.node_link_data(G)
    #     with open("./data/result.json","w") as f:
    #         json.dump(json_G,f)
    pass