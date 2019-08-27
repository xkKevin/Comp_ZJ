import networkx as nx
import community #this is from python-louvain
import sys
import json

def degree(G):
    degree = nx.degree(G)
    d = {}
    for di in degree:
        d[di[0]]=di[1]
    jsonStr = json.dumps(d)
    print(jsonStr)
    # sys.stdout.flush()


# if __name__ == "__main__":
try:
    calculate = sys.argv[1]

    with open('./data/result.json',"r") as f:
        json_data = json.load(f)

    G = nx.readwrite.json_graph.node_link_graph(json_data)
    
    if calculate == 'DG':
        degree(G)
    else:
        print("There is no such calculation!")
except Exception as e:
    print('Exception:',e)
else:
    pass