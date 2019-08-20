import networkx as nx
import community #this is from python-louvain
import sys
import json

def degree(G):
    degree = nx.degree(G)
    d = {}
    for di in degree:
        d[di[0]]=di[1]
    nx.set_node_attributes(G,d,'degree')
    
    jsonStr = json.dumps(d)
    print(jsonStr)


# if __name__ == "__main__":
calculate = sys.argv[1]
str_data = sys.argv[2]

with open(str_data,"r") as f:
    json_data = json.load(f)

G = nx.readwrite.json_graph.node_link_graph(json_data)

try:
    if calculate == 'DG':
        degree(G)
    else:
        print("There is no such calculate!")
except Exception as e:
    print('Exception:',e)
else:
    # 保存当前图的结果
    # if calculate != 'SP':
    #     json_G = nx.readwrite.json_graph.node_link_data(G)
    #     with open("./data/result.json","w") as f:
    #         json.dump(json_G,f)
    pass