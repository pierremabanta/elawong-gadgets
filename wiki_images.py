import requests
import json
from urllib.parse import quote

# Wikipedia page titles for Apple products
products = {
    "IPhone": "iPhone",
    "IPad_Pro": "iPad Pro", 
    "MacBook_Pro": "MacBook Pro",
    "MacBook_Air": "MacBook Air",
    "AirPods_Pro": "AirPods Pro",
    "AirPods": "AirPods",
    "Apple_Watch_Ultra": "Apple Watch Ultra",
    "Apple_Watch": "Apple Watch",
    "MagSafe": "MagSafe",
}

for wikititle, label in products.items():
    encoded = quote(wikititle, safe='')
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={encoded}&prop=pageimages&format=json&pithumbsize=600"
    try:
        r = requests.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
        data = r.json()
        for page_id, page_data in data.get("query", {}).get("pages", {}).items():
            thumb = page_data.get("thumbnail", {})
            source = thumb.get("source", "no image")
            if source != "no image":
                print(f"{label}: {source}")
            else:
                print(f"{label}: no thumbnail, page_id={page_id}, title={page_data.get('title','?')}")
    except Exception as e:
        print(f"{label}: ERROR: {e}")
        print(f"  URL: {url}")