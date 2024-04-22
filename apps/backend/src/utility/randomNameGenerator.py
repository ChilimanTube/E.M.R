import random

adjectives = [
    "attractive", "bald", "beautiful", "chubby", "clean", "dazzling", "drab", "elegant", "fancy", "fit", "flabby",
    "glamorous", "gorgeous", "handsome", "long", "magnificent", "muscular", "plain", "plump", "quaint", "scruffy",
    "shapely", "short", "skinny", "stocky", "ugly", "unkempt", "unsightly"
]

cool_nouns = [
    "actor", "airplane", "airport", "army", "baseball", "beach", "bear", "bicycle", "bird", "book", "boss", "bottle",
    "time", "way", "year", "work", "government", "day", "man", "world", "life", "part", "house", "course", "case",
    "system", "place", "end", "group", "company", "party", "information", "school", "fact", "money", "point", "example",
    "state", "business", "night"
]


def random_name():
    return f"{random.choice(adjectives).capitalize()} {random.choice(cool_nouns).capitalize()}"
