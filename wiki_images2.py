import requests
import json
from urllib.parse import quote

# Wikipedia page titles for specific Apple products
search_terms = [
    "iPhone_15_Pro_Max",
    "iPhone_15",
    "iPhone_14",
    "IPad_Air",
    "IPad_Pro_(M4)",
    "MacBook_Pro_14-inch",
    "MacBook_Air_(M3)",
    "Apple_USB-C_Adapter",
    "MagSafe_(Mac)",
    "IPhone_X",
]

for term in search_terms:
    encoded = quote(term, safe='')
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={encoded}&prop=pageimages&format=json&pithumbsize=600"
    try:
        r = requests.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
        data = r.json()
        for page_id, page_data in data.get("query", {}).get("pages", {}).items():
            title = page_data.get("title", "?")
            thumb = page_data.get("thumbnail", {})
            source = thumb.get("source", "no image")
            if source != "no image":
                print(f"{term} -> {title}: {source}")
            else:
                print(f"{term} -> {title}: NO THUMBNAIL")
    except Exception as e:
        print(f"{term}: ERROR: {e}")