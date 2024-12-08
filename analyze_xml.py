import xml.etree.ElementTree as ET
from collections import Counter

def analyze_library_xml(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()

    genres = Counter()

    for book in root.findall('book'):
        genre = book.find('genre').text
        genres[genre] += 1

    print("Number of books by genre:")
    for genre, count in genres.items():
        print(f"{genre}: {count}")

if __name__ == "__main__":
    analyze_library_xml('library_books.xml')