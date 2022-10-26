
# %%
# For Python 2 / 3 compatability
from __future__ import print_function

import sys
import json
# %%
training_data = [
  [5,7,12,5.5  ],
  [4,5,10,6.5  ],
  [4,5,10,6.5  ],
  [2,4,8,9.0  ],
  [4,6,10,6.5  ],
  [4,5,9,7.7  ],
  [4,5,9,9.0  ],
  [4,6,10,6.5  ],
  [4,6,12,5.5  ],
  [4,6,12,5.5  ],
  [4,5,10,7.7  ],
  [4,4,9,9.0  ],
  [2,6,11,6.5  ],
  [2,6,11,6.5  ],
  [2,5,9,9.0  ],
  [6.5,4,8,9.0  ],
  [2.5,5,9,9.0  ],
  [0,4,8,9.0  ],
  [6,4,8,7.7  ],
  [6,5,8,6.5  ],
  [6,5,8,5.5  ],
  [7,4,8,7.7  ],
  [5,3,4,7.7  ],
  [5,3,8,7.7  ],
  [5,4,8,7.7  ],
  [5,4,8,7.7  ],
  [4,5,9,7.7  ],
  [3.5,3,6,7.7  ],
  [3.5,3,6,7.7  ],
  [2.5,4,8,6.5  ]
]
training_data = [
  [7,12,5.5  ],
  [5,10,6.5  ],
  [5,10,6.5  ],
  [4,8,9.0  ],
  [6,10,6.5  ],
  [5,9,7.7  ],
  [5,9,9.0  ],
  [6,10,6.5  ],
  [6,12,5.5  ],
  [6,12,5.5  ],
  [5,10,7.7  ],
  [4,9,9.0  ],
  [6,11,6.5  ],
  [6,11,6.5  ],
  [5,9,9.0  ],
  [4,8,9.0  ],
  [5,9,9.0  ],
  [4,8,9.0  ],
  [4,8,7.7  ],
  [5,8,6.5  ],
  [5,8,5.5  ],
  [4,8,7.7  ],
  [3,4,7.7  ],
  [3,8,7.7  ],
  [4,8,7.7  ],
  [4,8,7.7  ],
  [5,9,7.7  ],
  [3,6,7.7  ],
  [3,6,7.7  ],
  [4,8,6.5  ]
]
training_data = [
  [6,12,5.5],
  [6,12,5.5],
  [5,10,6.5],
  [6,10,6.5],
  [5,9,7.7],
  [5,10,7.7],
  [4,8,9.0],
  [4,9,9.0]
]

# %%
# Column labels.
# These are used only to print the tree.
#header = ["Wind Direction", "Wind Average", "Wind Gusts", "Sail"]
header = ["Wind Average", "Wind Gusts", "Sail"]

# %%
def unique_vals(rows, col):
    """Find the unique values for a column in a dataset."""
    return set([row[col] for row in rows])

# %%
unique_vals(training_data, 2)

# %%
def class_counts(rows):
    """Counts the number of each type of example in a dataset."""
    counts = {}  # a dictionary of label -> count.
    for row in rows:
        # in our dataset format, the label is always the last column
        label = row[-1]
        if label not in counts:
            counts[label] = 0
        counts[label] += 1
    return counts

# %%
class_counts(training_data)

# %%
def is_numeric(value):
    """Test if a value is numeric."""
    return isinstance(value, int) or isinstance(value, float)

# %%
class Question:
    """A Question is used to partition a dataset.

    This class just records a 'column number' (e.g., 0 for Color) and a
    'column value' (e.g., Green). The 'match' method is used to compare
    the feature value in an example to the feature value stored in the
    question. See the demo below.
    """

    def __init__(self, column, value):
        self.column = column
        self.value = value

    def match(self, example):
        # Compare the feature value in an example to the
        # feature value in this question.
        val = example[self.column]
        if is_numeric(val):
            return val >= self.value
        else:
            return val == self.value
        #Nya metoden, tittar så det är ett nummer man skickar in returnerar true om det är större än frågans värde och false om det är mindre.
    def moreless(self, val):
        if is_numeric(val):
            return val >= self.value
        else:
            return val <= self.value

    def __repr__(self):
        # This is just a helper method to print
        # the question in a readable format.
        condition = "=="
        if is_numeric(self.value):
            condition = ">="
        return "Is %s %s %s?" % (
            header[self.column], condition, str(self.value))

# %%
# Skapar en fråga där vi säger är värmen  större eller mindre än vårt värde [0][1] alltså rad 0 värde 1 alltså 14.4
q = Question(1, training_data[0][1])

# %%

example = 11 #sätter 11 och kollar om det är mer eller mindre än valt värde
q.moreless(example)

# %%
def partition(rows, question):
    """Partitions a dataset.

    For each row in the dataset, check if it matches the question. If
    so, add it to 'true rows', otherwise, add it to 'false rows'.
    """
    true_rows, false_rows = [], []
    for row in rows:
        if question.match(row):
            true_rows.append(row)
        else:
            false_rows.append(row)
    return true_rows, false_rows

def partitionMoreLess(rows, question):
    """Partitions a dataset.

    For each row in the dataset, check if it matches the question. If
    so, add it to 'true rows', otherwise, add it to 'false rows'.
    """
    true_rows, false_rows = [], []
    for row in rows:
#         print(row,question.column)
        if question.moreless(row[question.column]):
            true_rows.append(row)
        else:
            false_rows.append(row)
    return true_rows, false_rows

# %%
true_rows, false_rows = partitionMoreLess(training_data, Question(1, 10)) #kolumn 1 (Wind Direction),över 20 grader

# %%
def gini(rows):
    """Calculate the Gini Impurity for a list of rows.

    There are a few different ways to do this, I thought this one was
    the most concise. See:
    https://en.wikipedia.org/wiki/Decision_tree_learning#Gini_impurity
    """
    counts = class_counts(rows)
    impurity = 1
    for lbl in counts:
        prob_of_lbl = counts[lbl] / float(len(rows))
        impurity -= prob_of_lbl**2
    return impurity

# %%
def info_gain(left, right, current_uncertainty):
    """Information Gain.

    The uncertainty of the starting node, minus the weighted impurity of
    two child nodes.
    """
    p = float(len(left)) / (len(left) + len(right))
    return current_uncertainty - p * gini(left) - (1 - p) * gini(right)

# %%
current_uncertainty = gini(training_data)

# %%
# How much information do we gain by partioning on 20 heat?
true_rows, false_rows = partitionMoreLess(training_data, Question(1, 10))
info_gain(true_rows, false_rows, current_uncertainty)

# %%
# How much information do we gain by partioning on labeln kylrum?
true_rows, false_rows = partitionMoreLess(training_data, Question(2, 7.7))
info_gain(true_rows, false_rows, current_uncertainty)

# %%
def find_best_split(rows):
    """Find the best question to ask by iterating over every feature / value
    and calculating the information gain."""
    best_gain = 0  # keep track of the best information gain
    best_question = None  # keep train of the feature / value that produced it
    current_uncertainty = gini(rows)
    n_features = len(rows[0]) - 1  # number of columns

    for col in range(n_features):  # for each feature

        values = set([row[col] for row in rows])  # unique values in the column

        for val in values:  # for each value

            question = Question(col, val)

            # try splitting the dataset
            true_rows, false_rows = partitionMoreLess(rows, question)

            # Skip this split if it doesn't divide the
            # dataset.
            if len(true_rows) == 0 or len(false_rows) == 0:
                continue

            # Calculate the information gain from this split
            gain = info_gain(true_rows, false_rows, current_uncertainty)

            # You actually can use '>' instead of '>=' here
            # but I wanted the tree to look a certain way for our
            # toy dataset.
            if gain >= best_gain:
                best_gain, best_question = gain, question

    return best_gain, best_question

# %%
# Find the best question to ask first for our toy dataset.
best_gain, best_question = find_best_split(training_data)

# %%
class Leaf:
    """A Leaf node classifies data.

    This holds a dictionary of class (e.g., "Apple") -> number of times
    it appears in the rows from the training data that reach this leaf.
    """

    def __init__(self, rows):
        self.predictions = class_counts(rows)

# %%
class Decision_Node:
    """A Decision Node asks a question.

    This holds a reference to the question, and to the two child nodes.
    """

    def __init__(self,
                 question,
                 true_branch,
                 false_branch):
        self.question = question
        self.true_branch = true_branch
        self.false_branch = false_branch

# %%
def build_tree(rows):
    """Builds the tree.

    Rules of recursion: 1) Believe that it works. 2) Start by checking
    for the base case (no further information gain). 3) Prepare for
    giant stack traces.
    """

    # Try partitioing the dataset on each of the unique attribute,
    # calculate the information gain,
    # and return the question that produces the highest gain.
    gain, question = find_best_split(rows)

    # Base case: no further info gain
    # Since we can ask no further questions,
    # we'll return a leaf.
    if gain == 0:
        return Leaf(rows)

    # If we reach here, we have found a useful feature / value
    # to partition on.
    true_rows, false_rows = partition(rows, question)

    # Recursively build the true branch.
    true_branch = build_tree(true_rows)

    # Recursively build the false branch.
    false_branch = build_tree(false_rows)

    # Return a Question node.
    # This records the best feature / value to ask at this point,
    # as well as the branches to follow
    # dependingo on the answer.
    return Decision_Node(question, true_branch, false_branch)

# %%
my_tree = build_tree(training_data)

# %%
def classify(row, node):
    """See the 'rules of recursion' above."""

    # Base case: we've reached a leaf
    if isinstance(node, Leaf):
        return node.predictions

    # Decide whether to follow the true-branch or the false-branch.
    # Compare the feature / value stored in the node,
    # to the example we're considering.
    if node.question.match(row):
        return classify(row, node.true_branch)
    else:
        return classify(row, node.false_branch)

# %%
# Evaluate

sys.stdout.write(json.dumps(classify([float(sys.argv[1]), float(sys.argv[2])], my_tree)))
sys.stdout.flush()
sys.exit(0)