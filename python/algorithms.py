import networkx as nx
import community #this is from python-louvain
import sys
import json

def communityDetect(G):
    # print("communityDetect: \n", G.node['I5'])
    communities = community.best_partition(G)
    result = json.dumps(communities)
    print(result)
    # 给图添加属性
    nx.set_node_attributes(G,communities,'community')

def pageRank(G,node=None):
    # print("pageRank:\n", G.nodes())
    pr=nx.pagerank(G)
    if node:
        print(pr[node])
    else:
        # pagerank = sorted(pr.items(), key=lambda item: item[1], reverse=True)
        # jsonStr = json.dumps(pagerank)
        jsonStr = json.dumps(pr)
        print(jsonStr)
    # 给图添加属性，并保存计算的结果
    nx.set_node_attributes(G,pr,'pageRank')

def shortestPath(G, start, end):
    # print("shortestPath:", start,end,"\n", G.node['I5'])
    sp = nx.all_shortest_paths(G, source=start, target=end)
    spl = [spi for spi in sp]
    jsonStr = json.dumps(spl)
    print(jsonStr)  

# if __name__ == "__main__":
algorithm = sys.argv[1]
str_data = sys.argv[2]
# print(sys.argv,type(str_data))
# json_data = json.loads(str_data) 
with open(str_data,"r") as f:
    json_data = json.load(f)

# for i in json_data['links']:
#     i['weight'] = int(i['weight'])

G = nx.readwrite.json_graph.node_link_graph(json_data)

try:
    if algorithm == 'CD':
        communityDetect(G)
    elif algorithm == 'PR':
        if len(sys.argv) > 3:
            pageRank(G,sys.argv[3])
        else:
            pageRank(G)
    elif algorithm == 'SP':
        shortestPath(G, sys.argv[3], sys.argv[4])
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