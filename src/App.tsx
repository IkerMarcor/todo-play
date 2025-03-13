import "./App.css";
import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function App() {
  // Progress
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ul>
        <li>
          <Drawer>
            <DrawerTrigger>
              <Button variant="completed" disabled>
                <Label className="text-green-600 line-through">Tarea 0</Label>
                <Badge variant="completed">
                  <svg
                    fill="#ffffff"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 415.582 415.582"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path d="M411.47,96.426l-46.319-46.32c-5.482-5.482-14.371-5.482-19.853,0L152.348,243.058l-82.066-82.064 c-5.48-5.482-14.37-5.482-19.851,0l-46.319,46.32c-5.482,5.481-5.482,14.37,0,19.852l138.311,138.31 c2.741,2.742,6.334,4.112,9.926,4.112c3.593,0,7.186-1.37,9.926-4.112L411.47,116.277c2.633-2.632,4.111-6.203,4.111-9.925 C415.582,102.628,414.103,99.059,411.47,96.426z"></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </Badge>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </li>
        <li>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">
                <div className="space-y-2">
                  <Label>
                    Tarea 1 Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Distinctio, voluptas sunt Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Quod hic aliquam expedita
                    molestias velit harum modi, nulla cumque voluptates. Nihil
                    quae placeat quaerat, magni unde tempore? Illum deserunt
                    consequatur aliquam?
                  </Label>
                  <Progress value={progress} />
                </div>
                <Badge>
                  <svg
                    fill="#ffffff"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>pause</title>{" "}
                      <path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.44 0.576t-0.576 1.44v16.16zM18.016 24.096q0 0.832 0.608 1.408t1.408 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.408 0.576t-0.608 1.44v16.16z"></path>{" "}
                    </g>
                  </svg>
                </Badge>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Task title</DrawerTitle>
                  <DrawerDescription>
                    Task description Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Consequatur libero ex nesciunt optio
                    molestiae similique veniam corporis magni nisi amet iste
                    culpa fugiat, suscipit rerum officiis reprehenderit placeat
                    distinctio nam.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex-1 text-center">
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Level
                      </div>
                      <div className="text-7xl font-bold tracking-tighter">
                        B
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 h-[120px]"></div>
                </div>
                <DrawerFooter>
                  <Progress value={progress} />
                  <div className="text-5xl font-bold">0:00</div>
                  <div className="my-3">
                    <Button variant="secondary">Edit</Button>
                    <Button variant="destructive">Eliminate</Button>
                  </div>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </li>
        <li>
          <Drawer>
            <DrawerTrigger>
              <Button variant="outline" disabled>
                <Label>Tarea 2</Label>
                <Badge>
                  <svg
                    viewBox="-3.78 -3.78 25.56 25.56"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4.154 0C2.964 0 2 .951 2 2.125v13.75c0 .784.437 1.504 1.138 1.874.7.37 1.55.329 2.211-.106l9.693-6.875A2.117 2.117 0 0016 9c0-.71-.36-1.374-.96-1.768L5.349.357A2.172 2.172 0 004.154 0z"
                        fill="#ffffff"
                        fill-rule="nonzero"
                      ></path>{" "}
                    </g>
                  </svg>
                </Badge>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </li>
        <li>
          <Drawer>
            <DrawerTrigger>
              <Button variant="outline" disabled>
                <Label>Tarea 3</Label>
                <Badge>
                  <svg
                    viewBox="-3.78 -3.78 25.56 25.56"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4.154 0C2.964 0 2 .951 2 2.125v13.75c0 .784.437 1.504 1.138 1.874.7.37 1.55.329 2.211-.106l9.693-6.875A2.117 2.117 0 0016 9c0-.71-.36-1.374-.96-1.768L5.349.357A2.172 2.172 0 004.154 0z"
                        fill="#ffffff"
                        fill-rule="nonzero"
                      ></path>{" "}
                    </g>
                  </svg>{" "}
                </Badge>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </li>
      </ul>
      <div className="flex justify-center gap-4 my-4">
        <Button>Filter</Button>
        <Button>
          <svg
            viewBox="-3.78 -3.78 25.56 25.56"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M4.154 0C2.964 0 2 .951 2 2.125v13.75c0 .784.437 1.504 1.138 1.874.7.37 1.55.329 2.211-.106l9.693-6.875A2.117 2.117 0 0016 9c0-.71-.36-1.374-.96-1.768L5.349.357A2.172 2.172 0 004.154 0z"
                fill="#ffffff"
                fill-rule="nonzero"
              ></path>{" "}
            </g>
          </svg>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Add Task</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <CardHeader>
              <CardTitle>Create a new task</CardTitle>
              <CardDescription>Add your new task in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Task Name</Label>
                    <Input id="name" placeholder="Name of your task" />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="prority">Prority</Label>
                      <Select>
                        <SelectTrigger id="prority">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="a">A</SelectItem>
                          <SelectItem value="b">B</SelectItem>
                          <SelectItem value="c">C</SelectItem>
                          <SelectItem value="d">D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="time">Time</Label>
                      <Select>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="1">1hr</SelectItem>
                          <SelectItem value="2">2hr</SelectItem>
                          <SelectItem value="3">3hr</SelectItem>
                          <SelectItem value="4">4hr</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div></div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Write a brief description about your new task"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button>Add</Button>
            </CardFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

export default App;
