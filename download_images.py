import requests
import os

urls = {
    "url1": ("1696258686454-60082b2c33e2", "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?w=600&h=600&fit=crop"),
    "url2": ("1544244015-0df4b3ffc6b0", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop"),
    "url3": ("1517336714731-489689fd1ca8", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop"),
    "url4": ("1601784551446-20c9e07cdbdb", "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop"),
    "url5": ("1640955014216-75201056c829", "https://images.unsplash.com/photo-1640955014216-75201056c829?w=600&h=600&fit=crop"),
    "url6": ("1587033411391-5d9e51cce126", "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=600&h=600&fit=crop"),
    "url7": ("1523275335684-37898b6baf30", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop"),
    "url8": ("1526170375885-4d8ecf77b99f", "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop"),
    "url9": ("1615663245857-ac93bb7c39e7", "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop"),
    "url10": ("1592899677977-9c10ca588bbd", "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop"),
    "url11": ("1583394838336-acd977736f90", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop"),
    "url12": ("1505740420928-5e560c06d30e", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"),
    "url13": ("1531297484001-80022131f5a1", "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=600&fit=crop"),
}

os.makedirs("images", exist_ok=True)

for name, (pid, url) in urls.items():
    r = requests.get(url, timeout=10)
    fname = f"images/{name}_{pid[:10]}.jpg"
    with open(fname, "wb") as f:
        f.write(r.content)
    print(f"Saved {fname} ({len(r.content)} bytes)")