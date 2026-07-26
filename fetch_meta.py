import requests
import re

photo_ids = [
    ("1696258686454-60082b2c33e2", "url1"),
    ("1544244015-0df4b3ffc6b0", "url2"),
    ("1517336714731-489689fd1ca8", "url3"),
    ("1601784551446-20c9e07cdbdb", "url4"),
    ("1640955014216-75201056c829", "url5"),
    ("1587033411391-5d9e51cce126", "url6"),
    ("1523275335684-37898b6baf30", "url7"),
    ("1526170375885-4d8ecf77b99f", "url8"),
    ("1615663245857-ac93bb7c39e7", "url9"),
    ("1592899677977-9c10ca588bbd", "url10"),
    ("1583394838336-acd977736f90", "url11"),
    ("1505740420928-5e560c06d30e", "url12"),
    ("1531297484001-80022131f5a1", "url13"),
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

for pid, label in photo_ids:
    url = f"https://unsplash.com/photos/{pid}"
    try:
        r = requests.get(url, headers=headers, timeout=15)
        html = r.text
        
        # Check if we got bot detection
        if "Making sure" in html or "bot" in html.lower()[:500]:
            print(f"{label}: Bot detection page")
            continue
            
        # Try JSON-LD
        ld_matches = re.findall(
            r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',
            html, re.DOTALL
        )
        if ld_matches:
            print(f"{label}: JSON-LD found ({len(ld_matches[0])} chars)")
            # Try to find description
            desc = re.search(r'"description"\s*:\s*"([^"]+)"', ld_matches[0])
            if desc:
                print(f"  Description: {desc.group(1)[:200]}")
        
        # Try OG tags
        og_image = re.search(r'<meta[^>]+property="og:image"[^>]+content="([^"]+)"', html)
        og_title = re.search(r'<meta[^>]+property="og:title"[^>]+content="([^"]+)"', html)
        og_desc = re.search(r'<meta[^>]+property="og:description"[^>]+content="([^"]+)"', html)
        
        if og_title:
            print(f"  OG Title: {og_title.group(1)[:200]}")
        if og_desc:
            print(f"  OG Desc: {og_desc.group(1)[:200]}")
        
        # Find alt text on the main image
        alts = re.findall(r'alt="([^"]*)"', html)
        meaningful_alts = [a for a in alts if len(a) > 10]
        if meaningful_alts:
            print(f"  Alt text: {meaningful_alts[0][:200]}")
            
    except Exception as e:
        print(f"{label}: ERROR: {e}")
