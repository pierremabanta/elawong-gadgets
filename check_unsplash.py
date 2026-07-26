import requests, re, json, sys

photo_ids = [
    ("1696258686454-60082b2c33e2", "iPhone generic"),
    ("1544244015-0df4b3ffc6b0", "iPad generic"),
    ("1517336714731-489689fd1ca8", "MacBook generic"),
    ("1601784551446-20c9e07cdbdb", "case generic"),
    ("1640955014216-75201056c829", "adapter generic"),
    ("1587033411391-5d9e51cce126", "iPad 2"),
    ("1523275335684-37898b6baf30", "watch 1"),
    ("1526170375885-4d8ecf77b99f", "watch 2"),
    ("1615663245857-ac93bb7c39e7", "phone 2"),
    ("1592899677977-9c10ca588bbd", "earbuds 1"),
    ("1583394838336-acd977736f90", "earbuds 2"),
    ("1505740420928-5e560c06d30e", "headphones"),
    ("1531297484001-80022131f5a1", "laptop 2"),
]

for pid, label in photo_ids:
    try:
        r = requests.get(f"https://unsplash.com/photos/{pid}", timeout=10,
                         headers={"User-Agent": "Mozilla/5.0"})
        alts = re.findall(r'alt="([^"]+)"', r.text)
        title_match = re.search(r'<title>([^<]+)</title>', r.text)
        title = title_match.group(1) if title_match else "N/A"
        desc_match = re.search(r'<meta[^>]+name="description"[^>]+content="([^"]+)"', r.text)
        desc = desc_match.group(1) if desc_match else "N/A"
        print(f"\n{label} ({pid}):")
        print(f"  Title: {title[:150]}")
        print(f"  Alt: {alts[0][:150] if alts else 'N/A'}")
        print(f"  Desc: {desc[:200]}")
    except Exception as e:
        print(f"\n{label} ({pid}): ERROR: {e}")